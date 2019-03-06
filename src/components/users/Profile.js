import React from "react";

class Profile extends React.Component {

    render() {
        const cardStyle = {
            width: '50%'
        };
        return (
            <div className="container" style={cardStyle}>
                <div className="card-group">
                    <div className="card btn shadow-lg bg-white" onClick={() => this.props.history.push('/profile/addresses')}>
                        <img className="card-img-top mx-auto" src="/world.svg" alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Addresses</h5>
                            <p className="card-text">Make sure your addresses are up to date</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    <router-link to="/profile/addresses">My Addresses</router-link>
                                </small>
                            </p>
                        </div>
                    </div>
                    &nbsp;
                    <div className="card btn shadow-lg bg-white" onClick={() => this.props.history.push('/profile/orders')}>
                        <img className="card-img-top mx-auto" src="/package.svg"
                             alt="Map"/>
                        <div className="card-body">
                            <h5 className="card-title">My Orders</h5>
                            <p className="card-text">Check all your orders</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    <router-link to="/profile/orders">My Orders</router-link>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
