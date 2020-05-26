const express = require("express");
const authControllers = require("./../../controllers/authControllers");
const { loginValidations } = require("../../config/requestValidations");
const passport = require("passport");
const passportConfig = require("./../../passport");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.get("/", auth, authControllers.getUser);

router.post(
  "/google",
  passport.authenticate("googleToken", { session: false }),
  authControllers.googleAuth
);

router.post(
  "/facebook",
  passport.authenticate("facebookToken", { session: false }),
  authControllers.facebookAuth
);

router.post("/", loginValidations, authControllers.signIn);

module.exports = router;
