import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "./../../actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const onClickHandler = () => {
        logout();
        window.location = "/";
    };

    const authLinks = (
        <ul>
            <li>
                {/* <Link to="/profiles">Developers</Link> */}
                <Link to="/profiles">Desarrolladores</Link>
            </li>
            <li>
                {/* <Link to="/posts">Posts</Link> */}
                <Link to="/posts">Publicaciones</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>
                    <span className="hide-sm"> Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={() => onClickHandler()} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{" "}
                    {/* <span className="hide-sm">Logout</span> */}
                    <span className="hide-sm">Cerrar sesión</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                {/* <Link to="/profiles">Developers</Link> */}
                <Link to="/profiles">Desarrolladores</Link>
            </li>
            <li>
                {/* <Link to="/register">Register</Link> */}
                <Link to="/register">Registrarse</Link>
            </li>
            <li>
                {/* <Link to="/login">Login</Link> */}
                <Link to="/login">Iniciar sesión</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> DevConnector
                </Link>
            </h1>
            {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </nav>
    );
};

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
