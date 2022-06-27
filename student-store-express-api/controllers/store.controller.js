const controller = {};

// DB
const {storage} = require("../data/storage");

controller.getProducts = (_req, res) => {
    res.status(200).json(storage.db)
};

module.exports = controller;