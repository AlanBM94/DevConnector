import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, authFacebook, authGoogle } from "./../../actions/auth";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Login = ({ login, isAuthenticated, authFacebook, authGoogle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  const responseGoogle = (res) => {
    authGoogle(res.accessToken);
  };

  const responseFacebook = (res) => {
    authFacebook(res.accessToken);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChangeHandler(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChangeHandler(e)}
            required
          />
        </div>

        <div className="buttonsContainer">
          <input type="submit" className="btn btn-primary" value="Login" />
          <FacebookLogin
            appId="538214960388156"
            autoLoad={false}
            textButton="Facebook"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn btn-facebook"
          />
          <GoogleLogin
            clientId="811142648388-pshno9ob3gf5srjel11lrsm6tdkgc9cr.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-google"
              >
                Google
              </button>
            )}
            buttonText="Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authFacebook: PropTypes.func.isRequired,
  authGoogle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, authFacebook, authGoogle })(
  Login
);
