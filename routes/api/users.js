const express = require("express");
const { registerValidations } = require("../../config/requestValidations");
const usersControllers = require("./../../controllers/usersControllers");
const router = express.Router();

router.post("/", registerValidations, usersControllers.registerUser);

module.exports = router;
