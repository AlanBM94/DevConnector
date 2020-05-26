const { check } = require("express-validator");

module.exports = {
  registerValidations: [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  loginValidations: [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  createProfileValidations: [
    check("status", "Status is required").not().isEmpty(),
    check("skills", "Skills are required").not().isEmpty(),
    check("website", "Website must be a valid url").isURL(),
  ],
  addExperienceValidations: [
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],
  addEducationValidations: [
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
  ],
  createPostValidations: [check("text", "Text is required").not().isEmpty()],
};
