const Sequelize = require("sequelize");
const db = require("../db");

class Order extends Sequelize.Model {}
Order.init(
  {
    state: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    direction: {
      type: Sequelize.STRING,
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "order" }
);

module.exports = Order;
