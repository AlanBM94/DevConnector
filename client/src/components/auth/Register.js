import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "./../../actions/alert";
import { register, authGoogle, authFacebook } from "./../../actions/auth";
import PropTypes from "prop-types";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Register = ({
    setAlert,
    register,
    isAuthenticated,
    authGoogle,
    authFacebook,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const onChangeHandler = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Password are not the same", "danger");
        } else {
            register({ name, email, password });
        }
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
            {/* <h1 className="large text-primary">Sign Up</h1> */}
            <h1 className="large text-primary">Registrarse</h1>
            <p className="lead">
                {/* <i className="fas fa-user"></i> Create Your Account */}
                <i className="fas fa-user"></i> Crea tu cuenta
            </p>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="Name"
                        placeholder="Nombre"
                        name="name"
                        // required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        // placeholder="Email Address"
                        placeholder="Correo electrónico"
                        name="email"
                        value={email}
                        onChange={(e) => onChangeHandler(e)}
                        // required
                    />
                    <small className="form-text">
                        {/* This site uses Gravatar so if you want a profile image,
                        use a Gravatar email */}
                        Este sitio utiliza Gravatar, así que si quieres una
                        imagen de perfil utiliza un email asociado a tu cuenta
                        de Gravatar o inicia sesión con tu cuenta de Google
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        // placeholder="Password"
                        placeholder="Contraseña"
                        name="password"
                        // minLength="6"
                        value={password}
                        onChange={(e) => onChangeHandler(e)}
                        // required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        // placeholder="Confirm Password"
                        placeholder="Confirmar contraseña"
                        name="password2"
                        // minLength="6"
                        value={password2}
                        onChange={(e) => onChangeHandler(e)}
                        // required
                    />
                </div>
                <div className="buttonsContainer">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Registrarse"
                    />
                    {/* <FacebookLogin
            appId="538214960388156"
            autoLoad={false}
            textButton="Facebook"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="btn btn-facebook"
          /> */}
                    <GoogleLogin
                        clientId="811142648388-8ckc0411cl0u9o21t622gh364oqs58vc.apps.googleusercontent.com"
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
                {/* Already have an account? <Link to="/login">Sign In</Link> */}
                Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </p>
        </>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    authGoogle: PropTypes.func.isRequired,
    authFacebook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
    setAlert,
    register,
    authGoogle,
    authFacebook,
})(Register);
