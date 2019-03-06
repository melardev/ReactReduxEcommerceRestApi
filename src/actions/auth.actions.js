import {UiActionCreator} from './ui.actions';
import {AuthAction} from "./types";
import {AxiosUsersService} from "../services/net/AxiosUsersService";
import {UsersService} from "../services/local/UsersService";


// Just as a remained here it is another syntax:
// const login({username, password}) =>{ return (dispatch) => {return axios blabla}}
function login(loginForm) {
    // return a function to be run async
    return dispatch => {
        dispatch(request());
        AxiosUsersService.login(loginForm)
            .then(
                result => {
                    if (result && result.data.success) {
                        const token = result.data.token;
                        const user = result.data.user;
                        user.token = token;
                        UsersService.saveUser(user);
                        dispatch(success(result.user));
                        dispatch(UiActionCreator.successToast("Logged In successfully as " + user.email));
                        // history.push('/');
                    } else {
                        if (result.errors)
                            dispatch(failure('Unknown error'));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(UiActionCreator.showErrorAlert(error.toString()));
                }
            );
    };

    function request() {
        return {type: AuthAction.LOGIN}
    }

    function success(user) {
        return {type: AuthAction.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: AuthAction.LOGIN_FAILURE, error}
    }
}

function logout() {
    // AxiosUsersService.logout();
    UsersService.clearSession();
    return {type: AuthAction.LOGOUT};
}

function register(registerForm) {
    return dispatch => {
        dispatch(request(registerForm));
        AxiosUsersService.create(registerForm)
            .then(res => {
                if (res.data.success) {
                    dispatch(success());
                    // history.push('/login');
                    if (res.data.full_messages && res.data.full_messages instanceof Array && res.data.full_messages.length > 0)
                        dispatch(UiActionCreator.successToast(res.data.full_messages[0]));
                    else
                        dispatch(UiActionCreator.successToast('Registration successful'));
                }
            }).catch(error => {
                debugger;

                if (error.response && error.response.data && error.response.data.full_messages) {
                    dispatch(UiActionCreator.showErrorAlert(error.response.data.full_messages.join(',')));
                    dispatch(failure(error.response.data.full_messages.join(',')));
                } else {
                    dispatch(failure(error.toString()));
                    dispatch(UiActionCreator.showErrorAlert(error.toString()));
                }
            }
        );
    };

    function request(user) {
        return {type: AuthAction.REGISTER, user}
    }

    function success(user) {
        return {type: AuthAction.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: AuthAction.REGISTER_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        AxiosUsersService.delete(id)
            .then(user => dispatch(success(id))).catch(error => dispatch(failure(id, error.toString())));
    };

    function request(id) {
        return {type: AuthAction.DELETE, id}
    }

    function success(id) {
        return {type: AuthAction.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: AuthAction.DELETE_FAILURE, id, error}
    }
}


function clearRegisterSuccess() {
    return {
        type: AuthAction.CLEAR_REGISTER_SUCCESS
    };
}

export const AuthActionCreators = {
    login,
    logout,
    register,
    delete: _delete, // delete is a reserved keyword

    clearRegisterSuccess,

};
