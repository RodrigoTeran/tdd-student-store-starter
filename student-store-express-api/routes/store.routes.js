const express = require("express");
const router = express.Router();

// Controller
const { getProducts, getProduct, createOrder, getOrders, getOrder } = require("../controllers/store.controller");

// Core
router.get("/", getProducts);
router.get("/:productId", getProduct)
router.post("/", createOrder)

module.exports = router;