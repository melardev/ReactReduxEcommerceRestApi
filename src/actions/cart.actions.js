import {CartService} from "../services/local/CartService";
import {CartAction} from "./types";

const addProductToCart = function (product, quantity) {
    CartService.addItem(product, quantity);
    return {
        type: CartAction.PRODUCT_ADDED_TO_CART,
        product, quantity
    }
};
const setCart = (cart) => {
    return {
        type: CartAction.SET_CART,
        cart
    }
};
const removeProductFromCart = (product) => {
    return (dispatch) => {
        CartService.removeItem(product);
        dispatch({
            type: CartAction.REMOVE_PRODUCT_FROM_CART,
            product
        });
    };
};

function clearCart() {
    return (dispatch) => {
        CartService.emptyCart();
        dispatch(setCart([]));
    };
}

export const CartActionCreator = {
    addProductToCart, setCart, removeProductFromCart, clearCart
};
