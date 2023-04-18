const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

class Favorites extends Model {}

Favorites.init({
  movie_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
  },
});

Favorites.associate = function (models) {
  Favorites.belongsTo(models.User, {
    foreignKey: {
      allowNull: false,
      unique: true, // Agrega esta opción para asegurarte de que solo haya un favorito por usuario
    },
  });
};
