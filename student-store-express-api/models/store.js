// Errors
const { BadRequestError } = require("../utils/errors");

const { storage } = require("../data/storage");

class Store {
    // Core
    static listProducts() {
        try {
            return storage.get("products").value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }
    static fetchProduct(id) {
        try {
            return storage.get("products").find({ id: Number(id) }).value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }
    static createOrder({
        shoppingCart,
        user
    }) {
        try {
            // Check of undefined
            if (!shoppingCart || !user) throw new BadRequestError(); // 400

            // Find duplicates
            const uniqueValues = new Set(shoppingCart.map(v => v.itemId));
            if (uniqueValues.size < shoppingCart.length) throw new BadRequestError(); // 400

            let total = 0;
            for (let i = 0; i < shoppingCart.length; i++) {
                let {
                    quantity,
                    itemId
                } = shoppingCart[i];
                if (!quantity || !itemId) throw new BadRequestError(); // 400
                total += shoppingCart[i].quantity * Store.fetchProduct(shoppingCart[i].itemId).price;
            };

            total *= 1.0875;
            total = Math.round(total * 100) / 100;

            const purchase = {
                id: storage.get("purchases").value().length + 1,
                name: user.name,
                email: user.email,
                order: shoppingCart,
                total,
                createdAt: new Date().toString(),
                receipt: `Receipt #${storage.get("purchases").value().length + 1}, by user: ${user.name}. Total price: $${total}`
            }

            storage.get("purchases").push(purchase).write();
            return purchase;
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    // Stretch
    static listOrders() {
        try {
            return storage.get("purchases").value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }

    static fetchOrder(id) {
        try {
            return storage.get("purchases").find({ id: Number(id) }).value();
        } catch (error) {
            throw new BadRequestError(error);
        }
    }
}

module.exports = Store;