const Sequelize = require("sequelize");
const db = require("../db");

class BoughtItems extends Sequelize.Model {}


BoughtItems.init(
  {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  },
  { sequelize: db, modelName: "boughtitems" }
);

module.exports = BoughtItems;