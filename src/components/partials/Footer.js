import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer text-center">
                <div className="container">
                    <span className="text-muted">&copy; 2019 - React-Redux Ecommerce by Melardev</span>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/melardev"
                       className="btn btn-social-icon btn-google-plus">
                        <i className="fa fa-youtube"/>
                    </a>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="http://facebook.com"
                       className="btn btn-social-icon btn-facebook">
                        <i className="fa fa-facebook"/>
                    </a>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/melardev"
                       className="btn btn-social-icon btn-github">
                        <i className="fa fa-github"/>
                    </a>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://plus.google.com/110174297675710954678"
                       className="btn btn-social-icon btn-google-plus"><i
                        className="fa fa-google-plus"/></a>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/melar_dev/"
                       className="btn btn-social-icon btn-instagram"><i
                        className="fa fa-instagram"/></a>&nbsp;
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/melardev"
                       className="btn btn-social-icon btn-twitter">
                        <i className="fa fa-twitter"/></a>&nbsp;
                </div>
            </footer>
        );
    }
}

export default Footer;
