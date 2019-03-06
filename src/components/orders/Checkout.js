import React, {Component} from 'react'
import {connect} from "react-redux";
import {AddressesActionCreator} from "../../actions/addresses.actions";
import {OrderActionCreator} from "../../actions/orders.actions";

class Checkout extends Component {

    constructor(props) {
        super(props);
        const defaultAddress = {
            id: -1,
            first_name: '',
            last_name: '',
            street_address: '',
            city: '',
            country: '',
            zip_code: ''
        };
        this.state = {
            selectedAddress: {...defaultAddress},
            mutableAddress: {...defaultAddress}
        };
    }

    onAddressChanged(evt) {
        // const selectedOptionHtml = evt.target.children[evt.target.selectedIndex];
        const addressId = parseInt(evt.target.value);
        const address = this.props.addressesData.addresses.find(address => address.id === addressId);

        this.setState({
            selectedAddress: address,
            mutableAddress: {...address}
        })
    }

    componentWillMount() {
        if (this.props.isLoggedIn)
            this.props.fetchAddresses();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.orderSuccess && this.props.orderSuccess !== prevProps.orderSuccess) {
            this.props.history.push('/');
            this.props.clearOrderSuccess();
        }
    }

    placeOrder() {
        const selectedAddress = this.state.selectedAddress;
        // _.isEqual(this.state.active_address, this.state.mutable_address)
        //if (activeAddress.first_name === this.state.first_name && activeAddress.last_name === this.state.last_name && activeAddress.country === this.state.country && activeAddress.city === this.state.city && activeAddress.zip_code === this.state.zip_code) {

        if (JSON.stringify(selectedAddress) === JSON.stringify(this.state.mutableAddress)) {
            this.props.checkoutReusingAddress(this.props.cartItems, this.state.selectedAddress.id)
        } else {
            this.props.checkoutWithNewAddress(this.props.cartItems, this.state.mutableAddress);
        }
    }

    onInputChange(key, evt) {
        this.setState({
            mutableAddress: {
                ...this.state.mutableAddress,
                [key]: evt.target.value
            }
        });
    }

    render() {

        let addressesView = <></>;
        if (this.props.addressesData.addresses.length > 0) {

            let options = this.props.addressesData.addresses.map(ad => {
                return <option key={ad.id}
                               value={ad.id}>{ad.street_address}/{ad.country}/{ad.city}/{ad.zip_code}</option>;
            });

            addressesView = (
                <select onChange={this.onAddressChanged.bind(this)}>
                    <option value="-1">Not selected</option>
                    {options}
                </select>)
        }
        return (
            <div
                className="card text-center shadow-lg p-3 mb-5 bg-white rounded page-hero d-flex align-items-center justify-content-center">
                <div className="cart-body">
                    {addressesView}
                    <h4>Shipping Address</h4>

                    <div className="form-group col-md-12">

                        <strong>First Name:</strong>
                        <input type="text" name="first_name" className="form-control"
                               onChange={(evt) => this.onInputChange('first_name', evt)}
                               value={this.state.mutableAddress.first_name}/>
                    </div>

                    <div className="form-group col-md-12">
                        <strong>Last Name:</strong>
                        <input type=" text" name=" last_name" className="form-control"
                               onChange={(evt) => this.onInputChange('last_name', evt)}
                               value={this.state.mutableAddress.last_name}/>
                    </div>

                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Street Address</strong></div>
                        <input type=" text" name=" address" className=" form-control"
                               onChange={(evt) => this.onInputChange('street_address', evt)}
                               value={this.state.mutableAddress.street_address}/>
                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>City:</strong></div>

                        <input type=" text" name=" city" className=" form-control"
                               onChange={(evt) => this.onInputChange('city', evt)}
                               value={this.state.mutableAddress.city}/>

                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Country:</strong></div>
                        <input type=" text" name=" state" className=" form-control"
                               onChange={(evt) => this.onInputChange('country', evt)}
                               value={this.state.mutableAddress.country}/>
                    </div>
                    <div className="form-group col-md-12">
                        <div className=" col-md-12"><strong>Zip / Postal Code:</strong></div>
                        <input type=" text" name=" zip_code" className=" form-control"
                               onChange={(evt) => this.onInputChange('zip_code', evt)}
                               value={this.state.mutableAddress.zip_code}/>
                    </div>

                </div>
                <div className="row cart-footer">
                    <button type="button" className="btn btn-primary btn-submit-fix"
                            onClick={this.placeOrder.bind(this)}>Place Order
                    </button>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAddresses: () => dispatch(AddressesActionCreator.fetchAddresses()),
        checkoutReusingAddress: (cartItems, addressId) => dispatch(OrderActionCreator.checkoutReusingAddress(cartItems, addressId)),
        checkoutWithNewAddress: (cartItems, addressObj) => dispatch(OrderActionCreator.checkoutWithNewAddress(cartItems, addressObj)),
        clearOrderSuccess: () => dispatch(OrderActionCreator.clearOrderSuccess())
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn,
        cartItems: state.CartReducer.cartItems,
        loading: state.AddressesReducer.loading,
        addressesData: state.AddressesReducer.addressesData,
        orderSuccess: state.OrdersReducer.orderSuccess,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
