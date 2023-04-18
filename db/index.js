const Sequelize = require("sequelize");

const sequelize = new Sequelize("tmdb-api", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
