import React from "react";
import {AuthActionCreators} from "../../actions/auth.actions";
import {connect} from "react-redux";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
    };


    onSubmitForm(evt) {
        this.props.submitForm(this.state);
    }

    onInputChange(key, evt) {
        this.setState({[key]: evt.target.value});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoggedIn && this.props.isLoggedIn !== prevProps.isLoggedIn) {
            this.props.history.push('/');
        }
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
                                        <legend className="">Login</legend>
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
                                        <div className="controls">
                                            <button className="btn btn-success" type="button"
                                                    onClick={this.onSubmitForm.bind(this)}>
                                                Login
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
        submitForm: (loginForm) => dispatch(AuthActionCreators.login(loginForm)),
    };
}

function mapStateToProps(state) {
    return {
        loading: state.AuthReducer.isLoggingIn,
        isLoggedIn: state.AuthReducer.isLoggedIn
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
