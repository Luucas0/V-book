const Sequelize = require("sequelize");
const db = require("../db");
const Book = require("./Book");

class Cart extends Sequelize.Model {}
Cart.init(
  {
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    productTitle: {
      type: Sequelize.STRING,
    },
    productImage: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    totalPrice: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "cart" }
);

Cart.beforeCreate(async (cart) => {
  let product = await Book.findByPk(cart.productId);
  cart.totalPrice = cart.amount * product.price;
  cart.productTitle = product.title;
  cart.productImage = product.posterURL;
});
module.exports = Cart;
