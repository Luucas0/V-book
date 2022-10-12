const { Cart, Order } = require("../models");
const { Op } = require("sequelize");

class CartController {
  static addToCart = async (req, res) => {
    const newCart = await Cart.create(req.body);
    let alreadyInOrder = false;
    const order = await Order.findAll({
      where: {
        [Op.or]: [
          { userId: req.user.id, state: "pending" },
          { userId: req.user.id, state: "procesing" },
        ],
      },
      include: [
        {
          model: Cart,
        },
      ],
    });
    order[0]?.carts.forEach((cart) => {
      if (cart.productId === req.body.productId) {
        alreadyInOrder = true;
      }
    });

    if (alreadyInOrder) {
      res.send("That product is already in your cart");
    } else {
      if (order.length) {
        order[0].addCart(newCart);
      } else {
        const newOrder = await Order.create({ userId: req.user.id });
        newOrder.addCart(newCart);
      }
      res.status(201).send(newCart);
    }
  };

  static deleteFromCart = async (req, res) => {
    const cart = await Cart.findOne({
      where: {
        [Op.or]: [
          { productId: Number(req.params.id), state: "pending" },
          { productId: Number(req.params.id), state: "procesing" },
        ],
      },
    });
    if (cart) {
      Cart.destroy({where:{id:cart.id}});
      res.status(204).send("deleted");
    } else {
      res.status(404).send("This article can't be reached");
    }
  };

  static editAmount = (req, res) => {
    //req.params.id ====> {"amount"}
    Cart.update(
      { amount: Number(req.body.amount) },
      {
        where: {
          [Op.or]: [
            { id: Number(req.params.id), state: "pending" },
            { id: Number(req.params.id), state: "procesing" },
          ],
        },
      }
    );
    res.status(203).send("Updated");
  };
}

module.exports = CartController;
