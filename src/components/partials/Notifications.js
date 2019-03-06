import React from "react";
import {connect} from "react-redux";
import swal from 'sweetalert2'
import {UiActionCreator} from "../../actions/ui.actions";
import {ToastContainer, toast} from 'react-toastify';

class Notifications extends React.Component {

    render() {
        // Make sure we have something to show && Not repeated message
        if (this.props.toast.message !== "") {
            toast.dismiss();
            toast(<div className={this.props.toast.className || "alert alert-success"}>
                <span>{this.props.toast.message.title || 'Message'}</span>: {this.props.toast.message}</div>, {
                autoClose: 4000,
                closeButton: false // Remove the super ugly close button that ships by default
            });
            this.props.clearToast();
        } else if (this.props.alert.message !== "") {

            swal.fire({
                title: this.props.alert.type === 'success' ? 'Success' : 'Error',
                text: this.props.alert.message,
                type: this.props.alert.type,
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: false,
                timer: 4000
            });
            this.props.clearAlert();
        } else if (this.props.is_loading) { // Not implemented yet

        }
        return (
            <ToastContainer/>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearToast: () => dispatch(UiActionCreator.clearToast()),
        clearAlert: () => dispatch(UiActionCreator.clearAlert())
    };
};
const mapStateToProps = (state) => {
    return {
        alert: state.UiReducer.alert,
        toast: state.UiReducer.toast
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
