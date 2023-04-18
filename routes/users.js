const express = require("express");
const router = express.Router();
const User = require("./users");
const { generateToken } = require("../config/tokens");
const { validateCookie } = require("../middleware/auth");

router.post("/register", (req, res, next) => {
  console.log(req.body);
  User.create(req.body).then((user) => res.status(201).send(user));
});

router.post("/login", (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    });
  });
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
