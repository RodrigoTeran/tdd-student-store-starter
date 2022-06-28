const controller = {};

// Model
const Store = require("../models/store");

// Stretch
controller.getOrders = (_req, res) => {
    res.status(200).json({
        orders: Store.listOrders()
    })
};

controller.getOrder = (req, res) => {
    const { orderId } = req.params;
    res.status(200).json({
        order: Store.fetchOrder(orderId)
    })
};

module.exports = controller;