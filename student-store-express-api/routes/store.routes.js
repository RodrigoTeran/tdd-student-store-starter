const express = require("express");
const router = express.Router();

// Controller
const { getProducts, getProduct, createOrder } = require("../controllers/store.controller");

router.get("/", getProducts);
router.get("/:productId", getProduct)
router.post("/", createOrder)

module.exports = router;