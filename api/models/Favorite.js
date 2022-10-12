const Sequelize = require("sequelize");
const db = require("../db");

class Favorite extends Sequelize.Model {}
Favorite.init(
  {
    bookId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    bookTitle: {
      type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    bookImage: {
      type: Sequelize.STRING,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    price: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "favorite" }
);
module.exports = Favorite;
