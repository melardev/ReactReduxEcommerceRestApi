import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './App.css';
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import Home from "./components/pages/Home";
import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import AddressList from "./components/addresses/AddressList";
import OrderList from "./components/orders/OrderList";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Register from "./components/users/Register";
import Cart from "./components/cart/Cart";
import NotFound from "./components/pages/NotFound";
import Checkout from "./components/orders/Checkout";
import Profile from "./components/users/Profile";

import Notifications from "./components/partials/Notifications";
import ProductCreate from "./components/products/ProductCreate";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Header/>
                    <Notifications/>
                    <Switch>
                        {/* Home */}
                        <Redirect exact from='/' to='/home'/>
                        <Route path="/home" component={Home}/>

                        {/* Product routes */}
                        <Route path='/products' component={ProductList} exact={true}/>
                        <Route exact path='/products/new' component={ProductCreate}/>
                        <Route path='/products/:slug' component={ProductDetails}/>

                        {/* Product routes */}
                        <Route path='/cart' component={Cart} exact={true}/>

                        {/* Addresses routes */}
                        <Route exact path='/profile/addresses' component={AddressList}/>


                        <Route exact path='/profile/orders' component={OrderList}/>
                        {/*<AuthComponentGuard exact path='/orders' component={OrderList}/>*/}
                        <Route path='/cart' component={Cart} exact={true}/>
                        <Route path='/checkout' component={Checkout} exact={true}/>

                        {/* Authentication */}
                        <Route exact path="/logout" component={Logout}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/login" component={Login}/>

                        {/* Profile */}
                        <Route exact path="/profile" component={Profile}/>


                        <Route component={NotFound}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
