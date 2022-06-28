const express = require("express");
const router = express.Router();

// Controller
const { getProducts, getProduct, createOrder, getOrders, getOrder } = require("../controllers/store.controller");

// Core
router.get("/", getProducts);
router.get("/:productId", getProduct)
router.post("/", createOrder)

// Stretch
router.get("/get-orders", getOrders);
router.get("/get-orders/:orderId", getOrder)

module.exports = router;