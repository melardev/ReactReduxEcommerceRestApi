import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
import {AuthActionCreators} from "../../actions/auth.actions";
import {withRouter} from "react-router";

class Header extends React.Component {

    logout() {
        this.props.logout();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.props.isLoggedIn && prevProps.isLoggedIn && this.props.location.pathname.startsWith('/profile')) {
            this.props.history.push('/');
        }
    }

    render() {
        let userView;
        if (this.props.isLoggedIn)
            userView = <h1>Profile</h1>;
        else
            userView = <h2>Register</h2>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">Melardev</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive"
                            aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/" exact
                                         activeStyle={{color: 'white'}}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products"
                                         activeStyle={{color: 'white'}}>Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart" activeStyle={{color: 'white'}}>Cart</NavLink>
                            </li>

                            {this.props.isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile"
                                                 activeStyle={{color: 'white'}}>Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        {/*<NavLink className="nav-link" to="/logout" activeStyle={{color: 'white'}}>Logout</NavLink>*/}
                                        <span className="nav-link" onClick={this.logout.bind(this)}
                                              activeStyle={{color: 'white'}}>Logout</span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register"
                                                 activeStyle={{color: 'white'}}>Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login"
                                                 activeStyle={{color: 'white'}}>Login</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(AuthActionCreators.logout()),
    };
}

// take the isAuthenticated boolean from redux's store and place
// it into this.props.isAuthenticated
function mapStateToProps(state) {
    return {
        isLoggedIn: state.AuthReducer.isLoggedIn
    }
}

// We want is_authenticated boolean from the redux's store so we connect
// our component to redux
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
