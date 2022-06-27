const controller = {};

// Model
const Store = require("../models/store");

controller.getProducts = (_req, res) => {
    res.status(200).json(Store.listProducts())
};

controller.getProduct = (req, res) => {
    const { productId } = req.params;
    res.status(200).json({
        product: Store.fetchProduct(productId)
    })
};

module.exports = controller;