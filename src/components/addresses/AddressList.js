import React from "react";
import {connect} from "react-redux";
import {AddressesActionCreator} from "../../actions/addresses.actions";

class AddressList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3']
        }
    }

    componentDidMount() {
        this.props.fetchAddresses();
    }

    render() {
        const addressesView = this.props.addressesData.addresses.map((address, index) => {
            return (
                <div key={index} className={`col-lg-4 col-md-6 mb-4 ${this.state.classNames[index % 2]}`}
                     style={{maxWidth: "18rem", marginRight: "5px"}}>
                    <div className="card-header card h-100">{address.first_name} {address.last_name} </div>
                    <div className="card-body">
                        <h5 className="card-title">{address.street_address} {address.city} {address.country}</h5>
                        <p className="card-text">Zip code: {address.zip_code}</p>
                    </div>
                </div>
            )
        });
        return (


            <div className="row">
                {this.props.addressesData.addresses.length > 1 && addressesView}
                {this.props.addressesData.addresses.length === 0 && <h3>You have not registered any address yet</h3>}
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAddresses: () => dispatch(AddressesActionCreator.fetchAddresses()),
    };
}

function mapStateToProps(state) {
    return {
        addressesData: state.AddressesReducer.addressesData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
