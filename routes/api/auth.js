const express = require("express");
const authControllers = require("./../../controllers/authControllers");
const { loginValidations } = require("../../config/requestValidations");
const auth = require("../../middlewares/auth");
const router = express.Router();

router.get("/", auth, authControllers.getUser);

router.post("/", loginValidations, authControllers.signIn);

module.exports = router;
