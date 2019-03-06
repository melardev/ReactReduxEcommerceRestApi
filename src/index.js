import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import getStore from './store';
import * as serviceWorker from './serviceWorker';
import {UsersService} from "./services/local/UsersService";
import {AuthAction} from "./actions/types";
import {Provider} from "react-redux";
import {CartService} from "./services/local/CartService";
import {CartActionCreator} from "./actions/cart.actions";
import {AxiosService} from "./services/net/base/AxiosService";

const store = getStore();

// Init the cart
const cart = CartService.getCart();
store.dispatch(CartActionCreator.setCart(cart));

// Init the user if logged in
const user = UsersService.getUser();
if (user) {
    AxiosService.setUser(user);
    store.dispatch({type: AuthAction.LOGIN_SUCCESS, user});
}


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
