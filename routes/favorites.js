const express = require("express");
const router = express.Router();
const { validateCookie } = require("../middlewares/auth");
const { allFavs, addFav } = require("../controllers/favsController");

router.get("/", validateCookie, allFavs);
router.post("/add", validateCookie, addFav);
router.delete("/delete", validateCookie, addFav);

module.exports = router;
