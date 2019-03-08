import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {CartActionCreator} from "../../actions/cart.actions";
import './Cart.css'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItemsCount: []
        };
    }

    onInputChange(cartItem, quantity) {
        this.props.updateCartItemQuantity(cartItem, quantity);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cartItems !== prevProps.cartItems) {
            if (this.props.cartItems) {
                const cartItemsCount = [];
                this.props.cartItems.forEach(ci => cartItemsCount.push({id: ci.id, quantity: ci.quantity}));
                this.setState({cartItemsCount});
            }
        }
    }

    calculateSubtotal(cartItem) {
        return cartItem.quantity * cartItem.price;
    }

    render() {
        const stylecon = {
            marginTop: '100px',
            marginBottom: '110px'
        };

        const checkoutImage = {
            height: '100px',
            width: '100px'
        };


        const productsRender = this.props.cartItems.map((cartItem, index) => {
            let quantity;
            if (this.state.cartItemsCount[cartItem.id]) {
                debugger
                quantity = this.state.cartItemsCount[cartItem.id];
            } else
                quantity = cartItem.quantity;
            return (
                <tr key={index}>
                    <td data-th="Product">
                        <div className="row">
                            <div className="col-sm-3 hidden-xs">
                                <img src={cartItem.image_urls[0]}
                                     style={checkoutImage}
                                     alt={cartItem.name}
                                     className="img-responsive"/></div>
                            <div className="col-sm-9">
                                <h4 className="nomargin">{cartItem.name}</h4>
                                <p>{cartItem.description}</p>
                            </div>
                        </div>
                    </td>
                    <td data-th="Price">${cartItem.price}</td>
                    <td data-th="Quantity">
                        <input className="form-control text-center" type="number" min="1"
                               onChange={(evt) => {
                                   this.onInputChange(cartItem, parseInt(evt.target.value))
                               }}
                               defaultValue={quantity}/>
                    </td>
                    <td data-th="Subtotal" className="text-center">{this.calculateSubtotal(cartItem)}$</td>
                    <td className="actions" data-th="">
                        <button className="remove-product"
                                onClick={() => this.props.deleteProductFromCart(cartItem)}>
                            X
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            <div className="container" style={stylecon}>
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                    <tr>
                        <th style={{width: "50%"}}>Product</th>
                        <th style={{width: "10%"}}>Price</th>
                        <th style={{width: "8%"}}>Quantity</th>
                        <th style={{width: "22%"}} className="text-center">Subtotal</th>
                        <th style={{width: "10%"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRender}
                    </tbody>
                    <tfoot>
                    <tr className="visible-xs">
                        <td className="text-center"><strong>Total ${this.props.totalPrice}</strong></td>
                    </tr>
                    <tr>
                        <td><NavLink to="/products" className="btn btn-warning"><i
                            className="fa fa-angle-left"/> Continue Shopping</NavLink></td>
                        <td colSpan="2" className="hidden-xs"/>
                        <td className="hidden-xs text-center"><strong>Total ${this.props.totalPrice}</strong>
                        </td>
                        <td>

                            <NavLink to="/checkout" className="btn btn-success btn-block">
                                Checkout
                                <i className="fa fa-angle-right"/>
                            </NavLink>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        )
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        updateCartItemQuantity: (product, quantity) => dispatch(CartActionCreator.addProductToCart(product, quantity)),
        deleteProductFromCart: (product) => dispatch(CartActionCreator.removeProductFromCart(product))
    }
}

function mapStateToProps(state) {
    const cartItems = state.CartReducer.cartItems;
    const totalPrice = state.CartReducer.cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.price;
    }, 0 /* initial value*/);

    return {
        cartItems,
        totalPrice
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
