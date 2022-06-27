const express = require("express");
const router = express.Router();

// Controller
const { getProducts, getProduct } = require("../controllers/store.controller");

router.get("/", getProducts);
router.get("/:productId", getProduct)

module.exports = router;