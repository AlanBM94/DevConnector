import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "./../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        form: "",
        to: "",
        current: false,
        description: "",
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const changeCurrentHandler = (e) => {
        setFormData({ ...formData, current: !current });
        setToDateDisabled(!toDateDisabled);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addExperience(formData, history);
    };

    return (
        <>
            {/* <h1 className="large text-primary">Add An Experience</h1> */}
            <h1 className="large text-primary">Agrega experiencia</h1>
            <p className="lead">
                {/* <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past */}
                <i className="fas fa-code-branch"></i> Agrega cualquier
                desarrollador/programador posición que tu hayas tenido en el
                pasado
            </p>
            {/* <small>* = required field</small> */}
            <small>* = campo requerido</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="* Job Title"
                        placeholder="* Título de trabajo"
                        name="title"
                        value={title}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="* Company"
                        placeholder="* Compañía"
                        name="company"
                        value={company}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="Location"
                        placeholder="Localización"
                        value={location}
                        onChange={(e) => onChangeHandler(e)}
                        name="location"
                    />
                </div>
                <div className="form-group">
                    {/* <h4>From Date</h4> */}
                    <h4>Desde cuando</h4>
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => onChangeHandler(e)}
                        name="from"
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={title}
                            onChange={(e) => changeCurrentHandler(e)}
                            value=""
                        />{" "}
                        {/* Current Job */}
                        Trabajo actual
                    </p>
                </div>
                <div className="form-group">
                    {/* <h4>From Date</h4> */}
                    <h4>Hasta cuando</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        disabled={toDateDisabled ? "disabled" : ""}
                        onChange={(e) => onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        value={description}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="Job Description"
                        placeholder="Descripción de trabajo"
                    ></textarea>
                </div>
                <input
                    type="submit"
                    className="btn btn-primary my-1"
                    // value="Send"
                    value="Enviar"
                />
                <Link className="btn btn-light my-1" to="/dashboard">
                    {/* Go Back */}
                    Regresar
                </Link>
            </form>
        </>
    );
};

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
