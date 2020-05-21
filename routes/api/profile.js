const express = require("express");
const auth = require("./../../middlewares/auth");
const {
  createProfileValidations,
} = require("./../../config/requestValidations");
const {
  addExperienceValidations,
} = require("./../../config/requestValidations");
const {
  addEducationValidations,
} = require("./../../config/requestValidations");
const profileControllers = require("./../../controllers/profileControllers");

const router = express.Router();

router.get("/me", auth, profileControllers.getProfile);

router.post(
  "/",
  [auth, createProfileValidations],
  profileControllers.createProfile
);

router.get("/", profileControllers.getAllProfiles);

router.get("/user/:user_id", profileControllers.getProfileByUserId);

router.delete("/", auth, profileControllers.deleteProfile);

router.put(
  "/experience",
  [auth, addExperienceValidations],
  profileControllers.addExperience
);

router.delete("/experience/:exp_id", auth, profileControllers.deleteExperience);

router.put(
  "/education",
  [auth, addEducationValidations],
  profileControllers.addEducation
);

router.delete("/education/:edu_id", auth, profileControllers.deleteEducation);

router.get("/github/:username", profileControllers.getGithubAccount);
module.exports = router;
