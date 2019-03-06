import React from "react";
import {NavLink} from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return <div className="container">
            <h2>Not Found</h2>
            Go <NavLink to="/">Home</NavLink>
        </div>
    }
}

export default NotFound;
