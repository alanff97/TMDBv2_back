const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Favorites extends Model {}

Favorites.init(
  {
    mediaId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "favorites",
  }
);

module.exports = Favorites;
