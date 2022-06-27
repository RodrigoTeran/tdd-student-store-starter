const { storage } = require("../data/storage");

class Store {
    static listProducts() {
        return storage.get("products").value();
    }
    static fetchProduct(id) {
        return storage.get("products").find({ id: Number(id) }).value();
    }
    static createOrder({
        shoppingCart,
        user
    }) {
        // Check of undefined
        if (!shoppingCart || !user) throw new Error(); // 400

        // Find duplicates
        const uniqueValues = new Set(shoppingCart.map(v => v.itemId));
        if (uniqueValues.size < shoppingCart.length) throw new Error(); // 400

        let total = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            let {
                quantity,
                itemId
            } = shoppingCart[i];
            if (!quantity || !itemId) throw new Error(); // 400
            total += shoppingCart[i].quantity * Store.fetchProduct(shoppingCart[i].itemId).price;
        };

        total *= 1.0875;

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
    }
}

module.exports = Store;