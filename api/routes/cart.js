const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const {
  addToCart,
  deleteFromCart,
  editAmount,
} = require("../controllers/cart");

router.post("/", validateAuth, addToCart);

router.delete("/:id", validateAuth, deleteFromCart);

router.put("/:id", validateAuth, editAmount);

module.exports = router;
