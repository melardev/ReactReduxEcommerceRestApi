import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {ProductActionCreator} from "../../actions/products.actions";
import {connect} from "react-redux";
import {CartActionCreator} from "../../actions/cart.actions";
import {getApiUrl} from "../../utils/url_util";


class ProductDetails extends Component {

    state = {
        quantity: 1,
        navigationData: [
            {
                displayName: 'Home',
                url: '/'
            },
            {
                displayName: 'Products',
                url: '/products'
            }]
    };

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.slug);
    }

    productAdd() {
        this.props.addProductToCart(this.props.product, parseInt(this.state.quantity));
    }

    deleteFromCart = () => {
        this.props.deleteProductFromCart(this.props.product);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.product.slug && prevProps.product.slug == null) {
            // If we have something then update the state
            const navigationData = this.state.navigationData;
            navigationData.push({displayName: this.props.product.name, url: `/products/${this.props.product.slug}`});
            this.setState({...this.state, navigationData});
        }

        // If we have just received an update from redux store stating the product is in the cart &&
        // it was the first update(we only are interested in the first one, not subsequent) &&
        // the user has not changed the quantity input(state.quantity === prevState.quantity)
        // then that means we have to initialize the quantity state

        if (this.props.isInCart !== prevProps.isInCart) {
            if (this.props.isInCart) //we just got nitified the product is in the cart, set the input quantity value to the appropiate value
                this.setState({quantity: this.props.quantity});
            else // the user has remove the item from the cart, reset to 1
                this.setState({quantity: 1});
        }
    }

    render() {
        if (this.props.product.slug != null) {
            return (
                <div className="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div className="row">
                        {this.props.product.image_urls instanceof Array &&
                        this.props.product.image_urls.length > 0 &&
                        <div className="col-md-6">
                            <img className="card-img-top" src={getApiUrl(this.props.product.image_urls[0])} alt=""/>
                        </div>}

                        <div className="col-md-6">
                            <hr/>
                            <h3>{this.props.product.name}</h3>
                            <hr/>
                            <p dangerouslySetInnerHTML={{__html: this.props.product.description}}/>
                            <hr/>
                            <strong>Quantity</strong>
                            <input className="form-control col-md-2" type="number" name="quantity"
                                   value={this.state.quantity}
                                   onChange={(evt) => this.setState({quantity: evt.target.value})}/>
                            <h4>Price: $<strong>{this.props.product.price.toFixed(2)}</strong></h4>


                            {this.props.isInCart &&
                            <button className="btn btn-danger" onClick={this.deleteFromCart.bind(this)}>
                                Remove from cart
                            </button>}
                            &nbsp;
                            <button className="btn btn-warning" onClick={this.productAdd.bind(this)}>
                                {this.props.isInCart ? 'Update quantity' : 'Add to cart'}
                            </button>
                            &nbsp;
                            <NavLink className="btn btn-success" to={'/checkout'}>
                                <i className="fa fa-shopping-cart"/> Checkout</NavLink>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <h1>Loading ...</h1>
        }
    }
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchProduct: (slug) => dispatch(ProductActionCreator.fetchProduct(slug)),
        addProductToCart: (product, quantity) => dispatch(CartActionCreator.addProductToCart(product, quantity)),
        deleteProductFromCart: (product) => dispatch(CartActionCreator.removeProductFromCart(product)),
    }
}

function mapStateToProps(state) {
    const product = state.ProductReducer.selected_product;
    const cartItems = state.CartReducer.cartItems;
    let quantity;

    const cartItem = cartItems.find(ci => ci.id === product.id);
    const isInCart = !!cartItem;

    // if user has not changed quantity, then use either the localstorage stored value or 1
    quantity = cartItem ? cartItem.quantity : 1;

    return {
        product, isInCart, quantity, cartItems, cartItem
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
