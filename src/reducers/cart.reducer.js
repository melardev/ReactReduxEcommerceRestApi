import {CartAction} from "../actions/types";

const INITIAL_STATE = {
    cartItems: [],
    created_at: new Date().getTime(),
};
export const CartReducer = function cart(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CartAction.PRODUCT_ADDED_TO_CART: {
            const newState = {...state};
            const cartItem = newState.cartItems.find(ci => ci.id === action.product.id);
            if (cartItem) {
                // already in cart, only update quantity
                cartItem.quantity = action.quantity;
            } else {
                // new cart item
                newState.cartItems.push({...action.product, quantity: action.quantity})
            }
            return newState;
        }
        case CartAction.SET_CART:
            return {
                ...state, cartItems: action.cart
            };
        case CartAction.REMOVE_PRODUCT_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(ci => ci.id !== action.product.id)
            };
        default:
            return state; // reducers should return the same state iF they don't know
        // how to handle the action
    }
};
