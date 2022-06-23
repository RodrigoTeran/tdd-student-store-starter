import { Fragment } from "react";
import { getPriceFormat } from "../../utils/getPriceFormat";
import { motion } from "framer-motion";
import { elementVariants } from "../Sidebar/variants";
import "./ShoppingCart.css";

const TAX_RATE = 1.0875;

const TableElement = ({ name, quantity, price, _class = "" }) => {
  return (
    <div className={`cart-product-item ${_class}`}>
      <div title={name} className="cart-product-name">
        {name}
      </div>
      <div title={quantity} className="cart-product-quantity">
        {quantity}
      </div>
      <div title={price} className="cart-product-price">
        {price}
      </div>
    </div>
  );
};

export default function ShoppingCart({ products, shoppingCart }) {
  const getSubTotal = () => {
    let subtotal = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
      subtotal +=
        products[shoppingCart[i].itemId - 1].price * shoppingCart[i].quantity;
    }

    return subtotal;
  };

  return (
    <motion.div variants={elementVariants} className="shopping-cart">
      <div>
        {shoppingCart.length > 0 && (
          <>
            <div className="shopping-cart-title">Products:</div>
            <TableElement
              name="Product"
              quantity="#"
              price="$$"
              _class="header"
            />
            <div className="shopping-cart-list">
              {shoppingCart.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <TableElement
                      name={products[item.itemId - 1].name}
                      quantity={item.quantity}
                      price={getPriceFormat(
                        item.quantity * products[item.itemId - 1].price
                      )}
                    />
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
      <div className="taxes">
        Taxes:&nbsp;
        {getPriceFormat(getSubTotal() * (TAX_RATE - 1))}
      </div>
      <div className="total-price">
        Total price:&nbsp;
        {getPriceFormat(getSubTotal() * TAX_RATE)}
      </div>
    </motion.div>
  );
}
