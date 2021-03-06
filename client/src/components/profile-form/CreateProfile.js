import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AllCountries from "./AllCountries";
import { createProfile } from "./../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    });

    const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram,
    } = formData;

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <>
            {/* <h1 className="large text-primary">Create Your Profile</h1> */}
            <h1 className="large text-primary">Crea tu perfil</h1>
            <p className="lead">
                {/* <i className="fas fa-user"></i> Let's get some information to
                make your profile stand out */}
                <i className="fas fa-user"></i> Vamos a obtener información para
                hacer que tu perfil destaque
            </p>
            {/* <small>* = required field</small> */}
            <small>* = campo requerido</small>
            <form className="form" onSubmit={(e) => onSubmitHandler(e)}>
                <div className="form-group">
                    <select
                        name="status"
                        value={status}
                        onChange={(e) => onChangeHandler(e)}
                    >
                        {/* <option value="0">* Select Professional Status</option> */}
                        <option value="0">
                            * Selecciona estatus profesional
                        </option>
                        {/* <option value="Developer">Developer</option> */}
                        <option value="Developer">Desarrollador</option>
                        <option value="Junior Developer">
                            {/* Junior Developer */}
                            Desarrollador Junior
                        </option>
                        <option value="Senior Developer">
                            {/* Senior Developer */}
                            Desarrollador Senior
                        </option>
                        {/* <option value="Manager">Manager</option> */}
                        <option value="Manager">Gerente</option>
                        <option value="Student or Learning">
                            {/* Student or Learning */}
                            Estudiante o aprendiendo
                        </option>
                        <option value="Instructor">
                            {/* Instructor or Teacher */}
                            Instructor o Profesor
                        </option>
                        {/* <option value="Intern">Intern</option> */}
                        <option value="Intern">Interno</option>
                        <option value="Other">Otro</option>
                    </select>
                    <small className="form-text">
                        {/* Give us an idea of where you are at in your career */}
                        Danos una idea de en donde te encuentras en tu carrera
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        // placeholder="Company"
                        placeholder="Compañía"
                        value={company}
                        onChange={(e) => onChangeHandler(e)}
                        name="company"
                    />
                    <small className="form-text">
                        {/* Could be your own company or one you work for */}
                        Podría ser tu propia compañía o una para la que trabajas
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="Website"
                        placeholder="Sitio Web"
                        name="website"
                    />
                    <small className="form-text">
                        {/* Could be your own or a company website */}
                        Podría ser tuyo o un sitio de una compañía
                    </small>
                </div>
                <div className="form-group">
                    <select
                        // placeholder="Location"
                        placeholder="Localización"
                        value={location}
                        onChange={(e) => onChangeHandler(e)}
                        name="location"
                    >
                        <AllCountries />
                    </select>
                    {/* <small className="form-text">Country</small> */}
                    <small className="form-text">País</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="* Skills"
                        placeholder="* Habilidades"
                        name="skills"
                    />
                    <small className="form-text">
                        {/* Please use comma separated values (eg.
                        HTML,CSS,JavaScript,PHP) */}
                        Por favor utiliza una coma para separar tus habilidades
                        (por ejemplo. HTML, CSS, Javascript, PHP)
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        value={githubusername}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="Github Username"
                        placeholder="Nombre de usuario de Github"
                        name="githubusername"
                    />
                    <small className="form-text">
                        {/* If you want your latest repos and a Github link, include
                        your username */}
                        Si quieres tus últimos repositorios y un link a tu
                        cuenta de Github, incluye tu nombre de usuario
                    </small>
                </div>
                <div className="form-group">
                    <textarea
                        value={bio}
                        onChange={(e) => onChangeHandler(e)}
                        // placeholder="A short bio of yourself"
                        placeholder="Una pequeña biografía de ti"
                        name="bio"
                    ></textarea>
                    <small className="form-text">
                        {/* Tell us a little about yourself */}
                        Cuentanos un poco sobre ti
                    </small>
                </div>

                <div className="my-2">
                    <button
                        onClick={() =>
                            setDisplaySocialInputs(!displaySocialInputs)
                        }
                        type="button"
                        className="btn btn-light"
                    >
                        {/* Add Social Network Links */}
                        Agrega enlaces a tus redes sociales
                    </button>
                    {/* <span>Optional</span> */}
                    <span>Opcional</span>
                </div>

                {displaySocialInputs && (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input
                                type="text"
                                value={twitter}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Twitter URL"
                                name="twitter"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input
                                type="text"
                                value={facebook}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Facebook URL"
                                name="facebook"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input
                                type="text"
                                value={youtube}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="YouTube URL"
                                name="youtube"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input
                                type="text"
                                value={linkedin}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Linkedin URL"
                                name="linkedin"
                            />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input
                                type="text"
                                value={instagram}
                                onChange={(e) => onChangeHandler(e)}
                                placeholder="Instagram URL"
                                name="instagram"
                            />
                        </div>
                    </>
                )}

                <input
                    type="submit"
                    className="btn btn-primary my-1"
                    // value="Send"
                    // value="Enviar"
                />
                <Link className="btn btn-light my-1" to="/dashboard">
                    {/* Go Back */}
                    Regresar
                </Link>
            </form>
        </>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
