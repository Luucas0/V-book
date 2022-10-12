const express = require("express");
const router = express.Router();
const Book = require("./book");
const User = require("./users");
const Auth = require("./auth");
const Cart = require("./cart");
const Favorites = require("./favorites")
const Bought = require('./bought')

const Genre = require("./genre");

const Order = require("./order");
const Reviews = require("./reviews")


router.use("/book", Book);
router.use("/user", User);
router.use("/auth", Auth);
router.use("/cart", Cart);
router.use("/favorites", Favorites);
router.use("/bought", Bought)

router.use("/genres", Genre);

router.use("/order", Order);
router.use("/reviews", Reviews);



module.exports = router;
