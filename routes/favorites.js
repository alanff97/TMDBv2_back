const express = require("express");
const router = express.Router();
const { User, Favorites } = require("../models/index");
const { validateCookie } = require("../middlewares/auth");

router.get("/", validateCookie, async (req, res, next) => {
  try {
    const fav = await Favorites.findAll({
      where: { UserId: req.user.id },
    });

    res.status(200).send(fav);
  } catch (error) {
    next(error);
  }
});

router.post("/add", validateCookie, async (req, res, next) => {
  try {
    const { mediaId, type } = req.body;
    const user = await User.findByPk(req.user.id);
    const fav = await Favorites.create({ mediaId, type });
    await fav.setUser(user);
    res.send("Se agregó a favoritos");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
