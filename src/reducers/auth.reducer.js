import {AuthAction} from "../actions/types";

const emptyRegisterForm = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    message: '',
    classMessage: 'text-info',
    show_message: false,
};
const initialState = {
    isRegistering: false,
    registerSuccess: false,

    isLoggingIn: false,
    isLoggedIn: false,
    user: {},
};

export const AuthReducer = function (state = initialState, action) {
        switch (action.type) {
            case AuthAction.REGISTER:
                return {...state, isRegistering: true};
            case AuthAction.REGISTER_SUCCESS:
                return {...state, registerSuccess: true, isRegistering: false};
            case AuthAction.CLEAR_REGISTER_SUCCESS:
                return {...state, registerSuccess: false};
            case AuthAction.REGISTER_FAILURE:
                return {...state, registerSuccess: false, isRegistering: false};
            case AuthAction.LOGIN:
                return {...state, isLoggingIn: true};
            case AuthAction.LOGIN_SUCCESS:
                return {...state, isLoggedIn: true, isLoggingIn: false, user: action.user};
            case AuthAction.LOGOUT:
                return initialState;
            case AuthAction.AUTH_ERROR: // TODO: Remove this one
                return {...state, errors: action.payload};


            default:
                return state
        }
    }
;
