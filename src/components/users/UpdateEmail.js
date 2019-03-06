import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {validateUserFields, validateUserFieldsFailure, validateUserFieldsSuccess} from '../actions/validateUserFields';

import {Field, reduxForm, SubmissionError} from 'redux-form';
import {UsersActionCreator} from "../../actions/users.creator.actions";
import renderField from "../RenderField";


//Client side validation
function validate(values) {
    var errors = {};
    var hasErrors = false;
    if (!values.email || values.email.trim() === '') {
        errors.username = 'Enter email';
        hasErrors = true;
    }
    return hasErrors && errors;
}


//For instant async server validation
const asyncValidate = (values, dispatch) => {
    return dispatch(validateUserFields(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let {data, status} = result.payload.response;
            //if status is not 200 or any one of the fields exist, then there is a field error
            if (status != 200 || data.username || data.email) {
                //let other components know of error by updating the redux` state
                dispatch(validateUserFieldsFailure(data));
                throw data;
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });
};


//For any field errors upon submission (i.e. not instant check)
const validateAndUpdateEmail = (values, dispatch) => {

    return dispatch(UsersActionCreator.updateEmail(values, sessionStorage.getItem('jwtToken')))
        .then((result) => {
            // Note: Error's "data" is in result.payload.response.data (inside "response")
            // success's "data" is in result.payload.data
            if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(UsersActionCreator.updateEmailFailure(result.payload.response.data));
                throw new SubmissionError(result.payload.response.data);
            }
            //let other components know that we got user and things are fine by updating the redux` state
            dispatch(UsersActionCreator.updateEmailSuccess(result.payload.data));
            dispatch(UsersActionCreator.updateUserEmail(values)); //update current user's email (in user's state)
        });
};


class UpdateEmailForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUnmount() {
        //Important: If you are reusing a component that might have some state (like error), you should reset it
        //either here or in componentWillMount
        this.props.resetMe();
    }


    getMessage() {
        const {error, emailUpdated} = this.props.updateEmail;
        if (error) {
            return <div className="alert alert-danger">
                {error.email}
            </div>
        } else if (emailUpdated) {
            return <div className="alert alert-info">
                Email was updated!
            </div>
        } else {
            return <span/>
        }
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div>
                {this.getMessage()}
                <form onSubmit={handleSubmit(validateAndUpdateEmail.bind(this))}>
                    <Field
                        name="email"
                        type="email"
                        component={renderField}
                        label="Update Email*"/>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}>
                        Update Email
                    </button>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'UpdateEmailForm',
    fields: ['email'],
    asyncValidate,
    asyncBlurFields: ['email'],
    validate
})(UpdateEmailForm)