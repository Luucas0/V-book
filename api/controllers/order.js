const { Op } = require("sequelize");
const { Cart, Order, User, BoughtItems } = require("../models");
const transporter = require("../config/transporter");


class OrderController {
  static getOrder = async (req, res) => {
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
    order.length ? res.send(order[0]) : res.send(order);
  };

  static continueOrder = async (req, res) => {
    await Order.update(
      { state: "procesing" },
      { where: { userId: req.user.id, state: "pending" } }
    );
    const cart = await Order.findAll({
      where: { userId: req.user.id, state: "procesing" },
      include: [
        {
          model: Cart,
        },
      ],
    });

    if (cart[0]?.carts) {
      cart[0].carts.forEach(async (cart) => {
        await Cart.update({ state: "procesing" }, { where: { id: cart.id } });
      });
    }
    res.status(203).send(cart[0]);
  };

  static payOrder = async (req, res) => {
    //domicilio paymentmethod
    const cart = await Order.findAll({
      where: { userId: req.user.id, state: "procesing" },
      include: [
        {
          model: Cart,
        },
      ],
    });
    await Order.update(
      {
        state: "fulfilled",
        direction: req.body.direction,
        paymentMethod: req.body.paymentMethod,
      },
      { where: { userId: req.user.id, state: "procesing" } }
    );

    if (cart[0]?.carts) {
      cart[0].carts.forEach(async (cart) => {
        if (cart.state !== "fulfilled") {
          await Cart.update({ state: "fulfilled" }, { where: { id: cart.id } });
          await BoughtItems.create({
            productId: cart.productId,
            userId: req.user.id,
          });
        }
      });
    }
    console.log('env', process.env.PATH)
    await transporter.sendMail({
      from: '"Vbook team 🕶" <VbookP5@gmail.com>',
      to: req.user.email, // list of receivers
      subject: "Your order has been fulfilled ✔🛒", // Subject line

      html: {
        path: 'public/mail.html',
      }, // html body

    });

    res.status(203).send(cart);
  };
  static getFullfiled = async (req, res) => {
    const order = await Order.findAll({
      where: { userId: req.user.id, state: "fulfilled" },
      include: [
        {
          model: Cart,
        },
      ],
    });
    res.send(order);
  };

  static deleteOrder = async (req, res) => {
    const order = await Order.findOne({
      where: {
        [Op.or]: [
          { id: req.params.id, state: "pending" },
          { id: req.params.id, state: "procesing" },
        ],
      },
      include: [
        {
          model: Cart,
        },
      ],
    });
    order.carts.forEach(async (cart) => {
      await Cart.destroy({ where: { id: cart.id } });
    });
    Order.destroy({ where: { id: order.id } });
    res.send("deleted");
  };

  static getAllOrders = async (req, res) => {
    const orders = await Order.findAll({
      
      include: [
        {
          model: User,
        },
        {
          model: Cart,
        },
      ],
      order: [
        ["id", "DESC"]
      ],
    });
    res.send(orders);
  };

  static modifyOrderStatus = async (req, res) => {
    if (
      req.params.state !== "fulfilled" &&
      req.params.state !== "procesing" &&
      req.params.state !== "pending" &&
      req.params.state !== "rejected"
    ) {
      return res.send("invalid state");
    }

    const order = await Order.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Cart,
        },
      ],
    });

    order.carts.forEach(async (cart) => {
      await Cart.update(
        { state: req.params.state },
        { where: { id: cart.id } }
      );
    });

    Order.update({ state: req.params.state }, { where: { id: req.params.id } });
    res.send("Updated order status");
  };
}

module.exports = OrderController;
