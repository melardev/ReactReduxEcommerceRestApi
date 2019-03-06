import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import {UsersActionCreator} from "../../actions/users.creator.actions";


//Client side validation
function validate(values) {
    var errors = {};
    var hasErrors = false;
    if (!values.email || values.email.trim() === '') {
        errors.email = 'Enter email';
        hasErrors = true;
    }
    return hasErrors && errors;
}


//For any field errors upon submission (i.e. not instant check)
const validateAndForgotPwd = (values, dispatch) => {
    return dispatch(UsersActionCreator.forgotPwd(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let {data, status} = result.payload.response;
            //if status is not 200 or any one of the fields exist, then there is a field error
            if (response.payload.status != 200) {
                //let other components know of error by updating the redux` state
                dispatch(UsersActionCreator.forgotPwdFailure(data));
                throw data; //throw error
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(UsersActionCreator.forgotPwdSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });

};

class ForgotPwdForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }


    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div className="container">
                <form onSubmit={handleSubmit(validateAndForgotPwd)}>
                    <Field
                        name="email"
                        type="email"
                        component={renderField}
                        label="Email*"/>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}>
                        Submit
                    </button>
                    <Link
                        to="/"
                        className="btn btn-error"> Cancel
                    </Link>
                </form>
            </div>

        );
    }
}

export default reduxForm({
    form: 'ForgotPwdForm', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
})(ForgotPwdForm)