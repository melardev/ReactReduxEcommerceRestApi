import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class ValidateEmailAlert extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        //automatically verify for token if autoValidateToken is set to true (e.g. in ValidateEmail *page*)
        if(this.props.autoValidateToken) {
            this.props.validateEmail(this.props.token);
        }
    }

    componentWillReceiveProps(nextProps) {
        //if user is authenticated, then reroute the user to PostsList as authenticated user
        if(nextProps.user && nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
            this.context.router.push('/');
        }
    }

    componentWillUnmount() {
        this.props.resetMe();
    }


    getAlertMessage() {
        const resendEmailError = this.props.resendEmail.error && this.props.resendEmail.error.message;
        const validationError = this.props.user.error &&  this.props.user.error.message;

        if(resendEmailError || validationError) {
            return resendEmailError || validationError;
        } else if(this.props.user.user && !this.props.user.user.isEmailVerified) {
            if(this.props.resendEmail.sentAgain) {//if the user has pressed the 'resend' button
                return 'Resent Email. Please verify';
            } else {
                return 'Please verify email';
            }
        }
    }

    render() {
        let alertMessage = this.getAlertMessage();

        if(alertMessage) {
            return (
                <div className="container">
                    <div className="alert alert-danger">
                        {this.getAlertMessage()}
                        <a style={{paddingLeft:'20px'}} onClick={this.props.resend} href="javascript:void(0)">Resend</a>
                        <Link style={{paddingLeft:'20px'}} to='/profile'>Update Email</Link>
                    </div>
                </div>
            );
        } else {
            return <span/>
        }
    }
}

export default ValidateEmailAlert;