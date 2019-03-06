import {UiAction} from '../actions/types';

const defaultAlert = {type: '', message: ''};
const defaultToast = {className: undefined, message: ''};
const initialState = {
    alert: defaultAlert,
    toast: defaultToast
};

export const UiReducer = function (state = initialState, action) {
    switch (action.type) {
        case UiAction.ALERT_SUCCESS:
            return {
                ...state,
                alert: {
                    type: 'success',
                    message: action.message
                }
            };
        case UiAction.ALERT_ERROR:
            return {
                ...state,
                alert: {
                    type: 'error',
                    message: action.message
                }
            };
        case UiAction.ALERT_CLEAR:
            return {...state, alert: defaultAlert};
        case UiAction.TOAST_SHOW:
            return {
                ...state,
                toast: {
                    className: state.className,
                    message: state.message
                }
            };
        case UiAction.TOAST_CLEAR:
            return {...state, toast: defaultToast};
        case UiAction.TOAST_SUCCESS:
            return {...state, toast: {className: 'alert alert-success', message: action.message}};
        default:
            return state
    }
};
