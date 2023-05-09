const { User, Favorites } = require('../models/index');

const allFavs = async (req, res, next) => {
  try {
    const fav = await Favorites.findAll({
      where: { userId: req.user.id },
    });

    res.status(200).send(fav);
  } catch (error) {
    next(error);
  }
};

const addFav = async (req, res, next) => {
  try {
    const { mediaId, type } = req.body;
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
    const fav = await Favorites.create({ mediaId, type });
    await fav.setUser(user);
    res.send('Added to favorites');
  } catch (error) {
    next(error);
  }
};

const deleteFav = async (req, res, next) => {
  console.log(req.query);
  try {
    const { mediaId } = req.query;
    const deleted = await Favorites.destroy({
      where: { mediaId: parseInt(mediaId) },
    });
    deleted
      ? res.status(202).send('Remove from favorites')
      : res.status(404).send('Not Found');
    res.send('console');
  } catch (error) {
    next(error);
  }
};

module.exports = { allFavs, addFav, deleteFav };
