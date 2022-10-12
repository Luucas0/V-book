const { Op } = require("sequelize");
const { Cart, Order, BoughtItems } = require("../models");

class boughtItemsController {
    static getAllBoughtItems = async(req,res,next) =>{
        const cart = await BoughtItems.findAll({
            where: {
                userId: req.user.id,
            }
        })
    res.send(cart)
   }
}

module.exports = boughtItemsController;
