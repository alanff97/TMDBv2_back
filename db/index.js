const Sequelize = require("sequelize");
require("dotenv").config();
const db = process.env.DB;

const sequelize = new Sequelize(db, null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
