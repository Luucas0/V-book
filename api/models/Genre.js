const Sequelize = require("sequelize");
const db = require("../db");

class Genre extends Sequelize.Model {}


Genre.init(
  {
    genreName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "genre" }
);

module.exports = Genre;
