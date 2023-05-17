const { User, Favorites } = require('../models/index');
const { generateToken } = require('../config/tokens');

const allFavs = async (req, res, next) => {
  try {
    const fav = await Favorites.findAll({
      where: { userId: req.user.id },
    });

    res.status(200).send(fav);
  } catch (error) {
    return next(error);
  }
};

const addFav = async (req, res, next) => {
  try {
    const { mediaId, type, title, overview, image, backdrop_path } = req.body;
    const user = await User.findByPk(req.user.id);
    const existingFav = await Favorites.findOne({
      where: {
        mediaId: mediaId,
        userId: user.id,
      },
    });
    if (existingFav) {
      res.status(400).send('Favorite already exists');
      return;
    }
    const fav = await Favorites.create({
      mediaId,
      type,
      title,
      overview,
      image,
      backdrop_path,
    });
    await fav.setUser(user);
    const updatedFavorites = await Favorites.findAll({
      where: { userId: user.id },
    });

    return res.send({
      message: 'Added to favorites',
      data: updatedFavorites,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteFav = async (req, res, next) => {
  try {
    const { mediaId } = req.query;
    const user = await User.findByPk(req.user.id);
    const deleted = await Favorites.destroy({
      where: { mediaId: parseInt(mediaId) },
    });

    if (deleted) {
      const updatedFavorites = await Favorites.findAll({
        where: { userId: user.id },
      });
      res.status(202).send({
        message: 'Removed from favorites',
        data: updatedFavorites,
      });
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { allFavs, addFav, deleteFav };
