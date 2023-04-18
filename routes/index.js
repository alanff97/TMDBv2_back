const express = require("express");
const router = express.Router();

const Users = require("../routes/users");

router.use("/user", Users);

module.exports = router;
