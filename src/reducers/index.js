import {combineReducers} from "redux";
import {AuthReducer} from './auth.reducer'
import {ProductReducer} from './products.reducer'
import {CartReducer} from './cart.reducer'
import {PageReducer} from './pages.reducer'
import {AddressesReducer} from './addresses.reducer'
import {OrdersReducer} from './orders.reducer'
import {UiReducer} from './ui.reducer'

export const rootReducer = combineReducers({
    CartReducer,
    ProductReducer,
    AuthReducer,
    PageReducer,
    OrdersReducer,
    AddressesReducer,
    UiReducer
});
