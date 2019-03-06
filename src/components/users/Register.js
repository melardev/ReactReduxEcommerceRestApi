import React from "react";
import {connect} from "react-redux";
import {AuthActionCreators} from "../../actions/auth.actions";


class Register extends React.Component {

    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        message: '',
    };

    onSubmitForm(event) {
        this.props.submitForm(this.state)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // If registerSuccess is true but before was false, then we registered, let's move on to home
        if (this.props.registerSuccess && prevProps.registerSuccess === false) {
            this.props.clearRegisterSuccess();
            this.props.history.push('/');
        }
    }

    onInputChange(key, evt) {
        this.setState({[key]: evt.target.value});
    }

    render() {
        return (
            <div className="container" style={{marginTop: "100px"}}>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">

                            <form className="form-horizontal">
                                <fieldset>
                                    <div id="legend">
                                        <legend className="">Register</legend>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="email">First name</label>
                                        <div className="controls">
                                            <input type="text" id="username" name="first_name"
                                                   placeholder="first name"
                                                   value={this.state.first_name}
                                                   onChange={(evt) => this.onInputChange('first_name', evt)}
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="email">Last name</label>
                                        <div className="controls">
                                            <input type="text" id="username" name="last_name"
                                                   value={this.state.last_name}
                                                   onChange={(evt) => this.onInputChange('last_name', evt)}
                                                   placeholder="last name"
                                                   className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="username">Username</label>
                                        <div className="controls">
                                            <input type="text" id="username" name="username"
                                                   value={this.state.username}
                                                   onChange={(evt) => this.onInputChange('username', evt)}
                                                   placeholder="your username"
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="email">E-mail</label>
                                        <div className="controls">
                                            <input type="text" id="email" name="email"
                                                   placeholder="your email"
                                                   value={this.state.email}
                                                   onChange={(evt) => this.onInputChange('email', evt)}
                                                   className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="control-group">

                                        <label className="control-label" htmlFor="password">Password</label>
                                        <div className="controls">
                                            <input type="password" id="password"
                                                   name="password" placeholder=""
                                                   value={this.state.password}
                                                   onChange={(evt) => this.onInputChange('password', evt)}
                                                   className="form-control"/>
                                            <p className="help-block">the password you will be using</p>
                                        </div>
                                    </div>

                                    <div className="control-group">

                                        <label className="control-label" htmlFor="password_confirm">Password
                                            (Confirm)</label>
                                        <div className="controls">
                                            <input type="password" id="password_confirmation"
                                                   name="password_confirm"
                                                   placeholder=""
                                                   value={this.state.password_confirmation}
                                                   onChange={(evt) => this.onInputChange('password_confirmation', evt)}
                                                   className="form-control"/>
                                            <p className="help-block">confirm the password you provided</p>
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <div className="controls">
                                            <button className="btn btn-success" type="button"
                                                    onClick={this.onSubmitForm.bind(this)}>
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch, props) {

    return {
        submitForm: (registerForm) => dispatch(AuthActionCreators.register(registerForm)),
        clearRegisterSuccess: () => dispatch(AuthActionCreators.clearRegisterSuccess())
    }
}

function mapStateToProps(state) {

    return {
        loading: state.AuthReducer.isRegistering,
        registerSuccess: state.AuthReducer.registerSuccess
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
