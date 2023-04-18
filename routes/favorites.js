const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites");
const { validateCookie } = require("../middlewares/auth");

router.get("/", validateCookie, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
      include: [Favorites],
    });
    if (!user) return res.sendStatus(404);
    const favorites = user.favorites;
    favorites ? res.send(favorites) : null;
  } catch (error) {
    next(error);
  }
});
