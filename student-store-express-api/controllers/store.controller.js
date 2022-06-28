const controller = {};

// Model
const Store = require("../models/store");

// Core
controller.getProducts = (_req, res) => {
    res.status(200).json({
        products: Store.listProducts()
    })
};

controller.getProduct = (req, res) => {
    const { productId } = req.params;
    res.status(200).json({
        product: Store.fetchProduct(productId)
    })
};

controller.createOrder = (req, res) => {
    const {
        shoppingCart,
        user
    } = req.body;

    const purchase = Store.createOrder({
        shoppingCart,
        user
    });
    res.status(201).json({
        purchase
    })
};

// Stretch
controller.getOrders = (_req, res) => {
    res.status(200).json({
        orders: Store.listOrders
    })
};

controller.getOrder = (req, res) => {
    const { orderId } = req.params;
    res.status(200).json({
        order: Store.fetchOrder(orderId)
    })
};

module.exports = controller;