const express = require("express");
const router = express.Router();

// Controller
const { getOrder, getOrders } = require("../controllers/order.controller");

// Core
router.get("/", getOrders);
router.get("/:orderID", getOrder)

module.exports = router;