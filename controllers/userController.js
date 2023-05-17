const { User, Favorites } = require('../models/index');
const { generateToken } = require('../config/tokens');
const { validateCookie } = require('../middlewares/auth');

const userRegister = async (req, res, next) => {
  try {
    const { email, password, name, lastname } = req.body;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password,
        name,
        lastname,
      },
    });
    created
      ? res.status(201).send('User Registered')
      : res.status(409).send('User already exists');
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res
        .status(404)
        .send({ error: "We can't find an account with this email" });

    const isValid = await user.validatePassword(password);
    if (!isValid)
      return res.status(401).send({ error: 'Invalid password, try again.' });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    };
    const favoritesList = await Favorites.findAll({
      where: { userId: user.id },
    });
    const token = generateToken(payload);
    res.cookie('token', token);
    res.send({ user: payload, favorites: favoritesList });
  } catch (error) {
    next(error);
  }
};

const userMe = async (req, res, next) => {
  res.send(req.user);
};

const userLogout = async (req, res, next) => {
  res.clearCookie('token');
  res.sendStatus(204);
};

module.exports = { userRegister, userLogin, userLogout, userMe };
