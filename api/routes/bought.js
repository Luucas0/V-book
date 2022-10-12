const express = require("express");
const router = express.Router();
const { validateAuth } = require("../middleware/auth");
const {getAllBoughtItems} = require("../controllers/bought");


router.get("/getAll",  validateAuth, getAllBoughtItems)

module.exports = router;