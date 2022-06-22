import { Fragment } from "react";
import { getPriceFormat } from "../../utils/getPriceFormat";
import { motion } from "framer-motion";
import { elementVariants } from "../Sidebar/variants";
import "./ShoppingCart.css";

const TAX_RATE = 1.0875;

const TableElement = ({ item, products }) => {
  return (
    <div className="cart-product-item">
      <div className="cart-product-name">{products[item.itemId].name}</div>
      <div className="cart-product-quantity">{item.quantity}</div>
    </div>
  );
};

export default function ShoppingCart({ products, shoppingCart }) {
  const getSubTotal = () => {
    let subtotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
      subtotal +=
        products[shoppingCart[i].itemId].price * shoppingCart[i].quantity;
    }

    return subtotal;
  };

  return (
    <motion.div variants={elementVariants} className="shopping-cart">
      <div>
        {shoppingCart.length > 0 && (
          <>
            <div className="shopping-cart-title">Products:</div>
            <div className="shopping-cart-list">
              {shoppingCart.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <TableElement products={products} item={item} />
                  </Fragment>
                );
              })}
            </div>
          </>
        )}
        {shoppingCart.length == 0 && (
          <div className="notification">
            No items added to cart yet. Start shopping now!
          </div>
        )}
      </div>
      <div className="subtotal">
        Subtotal:&nbsp;
        {getPriceFormat(getSubTotal())}
      </div>
      <div className="total-price">
        Total price:&nbsp;
        {getPriceFormat(getSubTotal() * TAX_RATE)}
      </div>
    </motion.div>
  );
}
