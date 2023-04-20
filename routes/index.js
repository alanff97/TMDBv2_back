const express = require("express");
const router = express.Router();

const Users = require("../routes/users");
const Favorites = require("../routes/favorites");

router.use("/user", Users);
router.use("/favorites", Favorites);

module.exports = router;
