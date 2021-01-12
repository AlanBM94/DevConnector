import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                {/* <i className="fas fa-user-circle text-primary"></i> Edit Profile */}
                <i className="fas fa-user-circle text-primary"></i> Editar
                perfil
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                {/* <i className="fab fa-black-tie text-primary"></i> Add Experience */}
                <i className="fab fa-black-tie text-primary"></i> Agregar
                experiencia
            </Link>
            <Link to="/add-education" className="btn btn-light">
                {/* <i className="fas fa-graduation-cap text-primary"></i> Add Education */}
                <i className="fas fa-graduation-cap text-primary"></i> Agregar
                grado escolar
            </Link>
        </div>
    );
};

export default DashboardActions;
