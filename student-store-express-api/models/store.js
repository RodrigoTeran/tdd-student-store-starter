const { storage } = require("../data/storage");

class Store {
    static listProducts() {
        return storage.db;
    }
    static fetchProduct(id) {
        return storage.get("products").find({ id: Number(id) }).value();
    }
    static createOrder(purchase) {
        return storage.get("purchases").push(purchase).write();
    }
}

module.exports = Store;