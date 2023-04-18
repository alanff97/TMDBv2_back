const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/tokens");
const { validateCookie } = require("../middlewares/auth");

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.sendStatus(404);

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.sendStatus(401);

    const payload = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
    const token = generateToken(payload);
    res.cookie("token", token);
    res.send(payload);
  } catch (error) {
    next(error);
  }
});

router.get("/me", validateCookie, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

router.use("/", function (req, res) {
  res.sendStatus(404);
});

module.exports = router;
