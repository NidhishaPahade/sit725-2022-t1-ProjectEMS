import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import Auth from "../../helper/auth";
import PropTypes from "prop-types";
import logo from "../../img/ems.jpg";
import { Link } from "react-router-dom";

// import * as config from "../../config/config";

class Login extends Component {
  onSuccess = googleUser => {
    // THE CODE UNDER IS FOR RESTRICTING PREMISSION TO SPECIFIC EMAILS
    // THOSE EMAILs CAN BE CHANGED IN THE ./confg/config.js file

    // NOTE: Curentlly, every GMail account has premission to Login
    // Uncomment the following lines to change the behavior

    // const userHasPermission = config.emails.includes(
    //   googleUser.profileObj.email
    // );
    // if (userHasPermission) {
    Auth.setStorage(googleUser);
    this.props.getLoggedUser(googleUser.profileObj.email);
    this.props.history.push("/home");
    // } else {
    //   Auth.signOut();
    //   this.props.removeLoggedUser();
    //   alert("You do not have permission to login");
    // }
  };

  onFailure = error => {
    alert(error);
  };

  componentWillMount() {
    if (this.props.loggedUser != null) {
      this.props.history.push("/home");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedUser != null) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container container__login">
          <div className="login__section">
            <img
              src={logo}
              alt="EMS Mars logo"
              className="login__section__logo"
            />
            <h4>Welcome to EMS! </h4>
            <p className="no-data" style={{ marginBottom: "-.25rem" }}>
              Please sign in with your Google account!
            </p>
            <br />
            <br />
            <GoogleLogin
              buttonText="log in with Google"
              className="btn-primary btn-login"
              onSuccess={this.onSuccess}
              onFailure={this.onFailure}
            />
            <div className="intro">
              <ul>
                <li style={{ marginTop: ".6rem" }}>Made by Manpreet K.</li>
                <li>&copy; {new Date().getFullYear()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loggedUser: PropTypes.string,
  getLoggedUser: PropTypes.func.isRequired
};

export default Login;
