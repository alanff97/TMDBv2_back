const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

User.prototype.hash = function (password, salt) {
  return bcrypt.hash(password, salt);
};
User.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

module.exports = User;
