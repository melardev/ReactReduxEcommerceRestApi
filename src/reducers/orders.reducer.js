import {OrdersAction} from "../actions/types";

const INITIAL_STATE = {
    loading: false,
    ordersData: {
        pageMeta: {},
        orders: []
    },
    orderSuccess: false,
};
export const OrdersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OrdersAction.FETCH_ORDERS:
            return {...state, loading: true};
        case OrdersAction.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                ordersData: action.ordersData
            };
        case OrdersAction.local.ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orderSuccess: true
            };
        case OrdersAction.local.CLEAR_ORDER_SUCCESS:
            return {
                ...state,
                orderSuccess: false
            };
        default:
            return state;
    }
};
