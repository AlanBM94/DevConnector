const { check } = require("express-validator");

module.exports = {
    // registerValidations: [
    //   check("name", "Name is required").not().isEmpty(),
    //   check("email", "Please enter a valid email").isEmail(),
    //   check(
    //     "password",
    //     "Please enter a password with 6 or more characters"
    //   ).isLength({ min: 6 }),
    // ],
    registerValidations: [
        check("name", "Nombre es requerido").not().isEmpty(),
        check("email", "Por favor ingresa un email valido").isEmail(),
        check(
            "password",
            "Por favor ingresa una contraseña con 6 o más caracteres"
        ).isLength({ min: 6 }),
    ],
    // loginValidations: [
    //     check("email", "Please enter a valid email").isEmail(),
    //     check("password", "Password is required").exists(),
    // ],
    loginValidations: [
        check("email", "Por favor ingresa un email valido").isEmail(),
        check("password", "Contraseña es requerida").exists(),
    ],
    // createProfileValidations: [
    //     check("status", "Status is required").not().isEmpty(),
    //     check("skills", "Skills are required").not().isEmpty(),
    //     check("website", "Website must be a valid url").isURL(),
    // ],
    createProfileValidations: [
        check("status", "Estatus es requerido").not().isEmpty(),
        check("skills", "Habilidades son requeridas").not().isEmpty(),
        check("website", "Sitio Web debe de tener un URL valido").isURL(),
    ],
    // addExperienceValidations: [
    //     check("title", "Title is required").not().isEmpty(),
    //     check("company", "Company is required").not().isEmpty(),
    //     check("from", "From date is required").not().isEmpty(),
    // ],
    addExperienceValidations: [
        check("title", "Título es requerido").not().isEmpty(),
        check("company", "Compañía es requerida").not().isEmpty(),
        check("from", "La Fecha desde cuando es requerida").not().isEmpty(),
    ],
    // addEducationValidations: [
    //     check("school", "School is required").not().isEmpty(),
    //     check("degree", "Degree is required").not().isEmpty(),
    //     check("fieldofstudy", "Field of study is required").not().isEmpty(),
    //     check("from", "From date is required").not().isEmpty(),
    // ],
    addEducationValidations: [
        check("school", "Escuela es requerida").not().isEmpty(),
        check("degree", "Grado es requerido").not().isEmpty(),
        check("fieldofstudy", "Campo de estudio es requerido").not().isEmpty(),
        check("from", "La Fecha desde cuando es requerida").not().isEmpty(),
    ],
    // createPostValidations: [check("text", "Text is required").not().isEmpty()],
    createPostValidations: [
        check("text", "Texto es requerido").not().isEmpty(),
    ],
};
