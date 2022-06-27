const express = require("express");
const router = express.Router();

// Controller
const { getProducts } = require("../controllers/store.controller");

router.get("/", getProducts);

module.exports = router;