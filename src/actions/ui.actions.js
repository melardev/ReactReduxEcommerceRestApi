import {UiAction} from './types';

export const UiActionCreator = {
    successAlert,
    successToast,
    showErrorAlert,
    info,
    clearAlert,
    clearToast,
};

function successAlert(message) {
    return {type: UiAction.ALERT_SUCCESS, message};
}

function successToast(message) {
    return {type: UiAction.TOAST_SUCCESS, message};
}

function showErrorAlert(message) {
    return {type: UiAction.ALERT_ERROR, message};
}

function clearAlert() {
    return {type: UiAction.ALERT_CLEAR};
}

function clearToast() {
    return {type: UiAction.ALERT_CLEAR};
}

function info(message){
    return {
        type: UiAction.ALERT_INFO, message
    };
}
