import React from "react";
import {connect} from "react-redux";
import {OrderActionCreator} from "../../actions/orders.actions";
import Header from "../partials/Header";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3'],
        }
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {

        const ordersView = this.props.ordersData.orders.map((order, index) => {
            return (
                <div key={index} className={this.state.classNames[index % 2]} style={{maxWidth: "18rem", marinRight: "5px"}}>
                    <div className="card-header">{order.tracking_number}</div>
                    <div className="card-body">
                        <h5 className="card-title">{order.order_status}</h5>
                        <p className="card-text">{order.total_price}$ for {order.order_items_count}</p>
                    </div>
                </div>
            )
        });
        return (
            <>
                <Header/>
                <div className="container" style={{marginTop: "100px", marginBottom: "100px"}}>
                    <div className="row">
                        {this.props.ordersData.orders.length > 1 && ordersView}
                        {this.props.ordersData.orders.length === 0 && <h3>You have not made any order yet</h3>}
                    </div>
                </div>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchOrders: () => dispatch(OrderActionCreator.fetchOrders()),
    };
}

function mapStateToProps(state) {
    return {
        ordersData: state.OrdersReducer.ordersData,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
