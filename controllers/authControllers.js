const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.googleAuth = async (req, res, next) => {
  const payload = {
    user: { id: req.user.id },
  };

  return jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    }
  );
};

exports.facebookAuth = async (req, res, next) => {
  const payload = {
    user: { id: req.user.id },
  };

  return jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: 360000 },
    (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    }
  );
};
