import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "./../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        form: "",
        to: "",
        current: false,
        description: "",
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
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
        addEducation(formData, history);
    };

    return (
        <>
            {/* <h1 className="large text-primary">Add your Education</h1> */}
            <h1 className="large text-primary">Agrega tu grado escolar</h1>
            <p className="lead">
                {/* <i className="fas fa-code-branch"></i> Add any school or
                bootcamp that you have attended */}
                <i className="fas fa-code-branch"></i> Agrega cualquier escuela
                o bootcamp al que hayas asistido
            </p>
            {/* <small>* = required field</small> */}
            <small>* = campo requerido</small>
            <form className="form" onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="* School or Bootcamp"
                        placeholder="* Escuela o Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="* Degree or Certificate"
                        placeholder="* Grado escolar o certificado"
                        name="degree"
                        value={degree}
                        onChange={(e) => onChangeHandler(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="Field of Study"
                        placeholder="Campo de estudio"
                        value={fieldofstudy}
                        onChange={(e) => onChangeHandler(e)}
                        name="fieldofstudy"
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
                            value={degree}
                            onChange={(e) => changeCurrentHandler(e)}
                            value=""
                        />{" "}
                        {/* Current School */}
                        Escuela actual
                    </p>
                </div>
                <div className="form-group">
                    {/* <h4>To Date</h4> */}
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
                        // placeholder="Program Description"
                        placeholder="Descripción de programa"
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

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
