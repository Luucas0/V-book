const express = require("express");
const router = express.Router();
const { validateAuth, validateAdmin } = require("../middleware/auth");

const {
  continueOrder,
  getOrder,
  payOrder,
  getFullfiled,
  deleteOrder,
  getAllOrders,
  modifyOrderStatus
} = require("../controllers/order");

router.get("/", validateAuth, getOrder);

router.put("/", validateAuth, continueOrder);

router.put("/pay", validateAuth, payOrder);

router.delete("/:id", validateAuth, deleteOrder);

router.get("/fullfiledOrders", validateAuth, getFullfiled);

router.get("/admin", validateAuth, validateAdmin, getAllOrders);

router.put("/admin/:state/:id", validateAuth, validateAdmin, modifyOrderStatus);

module.exports = router;
