import * as React from "react";
import "./Sidebar.css";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

export default function Sidebar({
  isOpen,
  shoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  handleOnToggle,
}) {
  // TODO: styles should be wider than `350px` sidebar
  // TODO: noOpen -> it should only render the toggle button and shouldn't be wider than `150px`.
  return (
    <section className={`sidebar ${isOpen && "open"}`}>
      <button onClick={handleOnToggle} className="toggle-button">
        Toggle
      </button>
      {isOpen && (
        <>
          <ShoppingCart
            isOpen={isOpen}
            products={products}
            shoppingCart={shoppingCart}
          />
          <CheckoutForm
              isOpen={isOpen}
              shoppingCart={shoppingCart}
              checkoutForm={checkoutForm}
              handleOnCheckoutFormChange={handleOnCheckoutFormChange}
              handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
          />
        </>
      )}
    </section>
  );
}
