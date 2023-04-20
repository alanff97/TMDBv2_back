const express = require("express");
const router = express.Router();
const { validateCookie } = require("../middlewares/auth");
const {
  userRegister,
  userLogin,
  userLogout,
  userMe,
} = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", validateCookie, userMe);
router.post("/logout", userLogout);

module.exports = router;
