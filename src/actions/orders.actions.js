import {UiActionCreator} from "./ui.actions";
import {AddressesAction, OrdersAction} from "./types";
import {AxiosOrdersService} from "../services/net/AxiosOrdersService";
import {CartActionCreator} from "./cart.actions";

const fetchedOrders = (page_meta, orders) => {
    return {
        type: OrdersAction.FETCH_ORDERS_SUCCESS,
        ordersData: {
            page_meta, orders
        }
    }
};

const createFetchOrdersAction = () => {
    return {type: AddressesAction.FETCH_ADDRESSES}
};

const fetchOrders = () => {
    console.trace('OrderActionCreator::fetchOrders');
    return (dispatch) => {
        console.trace('OrderActionCreator::fetchOrders_Async');
        dispatch(UiActionCreator.info('Loading addresses'));
        dispatch(OrderActionCreator.createFetchOrdersAction());
        AxiosOrdersService.fetchAll().then(res => {
            if (res.data.success)
                dispatch(OrderActionCreator.fetchedOrders(res.data.page_meta, res.data.orders));
            else
                dispatch(UiActionCreator.showErrorAlert(res.data.full_messages ? res.data.full_messages : 'An error occurred'));
        }).catch(err => {
            console.error(err);
        });
    }
};

function checkoutSuccess() {
    return {
        type: OrdersAction.local.ORDER_SUCCESS
    };
}

function checkoutReusingAddress(cartItems, addressId) {
    return (dispatch) => {
        dispatch(UiActionCreator.info('Making order, please wait'));
        AxiosOrdersService.checkoutReusingAddress(cartItems, addressId).then(res => {
            if (res.data && res.data.success) {
                dispatch(OrderActionCreator.checkoutSuccess());
                dispatch(CartActionCreator.clearCart());
                dispatch(UiActionCreator.successAlert('Order processed successfully'));
            }
        }).catch(err => {
            throw err;
        });
    }
}

function checkoutWithNewAddress(cartItems, newAddressObject) {
    return (dispatch) => {
        dispatch(UiActionCreator.info('Making order, please wait'));
        AxiosOrdersService.checkoutWithNewAddress(cartItems, newAddressObject).then(res => {
            if (res.data && res.data.success) {
                dispatch(UiActionCreator.successAlert('Order processed successfully'));
                dispatch(OrderActionCreator.checkoutSuccess());
                dispatch(CartActionCreator.clearCart());
            }
        }).catch(err => {
            debugger;
            dispatch(UiActionCreator.errorAlert(err.message));
        });
    }

}

function clearOrderSuccess() {
    return {
        type: OrdersAction.local.CLEAR_ORDER_SUCCESS
    }
}

export const OrderActionCreator = {
    fetchOrders,
    fetchedOrders,
    createFetchOrdersAction,
    checkoutReusingAddress,
    checkoutWithNewAddress,
    checkoutSuccess,
    clearOrderSuccess
};
