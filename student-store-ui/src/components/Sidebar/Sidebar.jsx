import * as React from "react";
import "./Sidebar.css";

import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "./variants";

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
  return (
    <section className={`sidebar ${isOpen && "open"}`}>
      <button
        title="Toggle Sidebar"
        onClick={handleOnToggle}
        className="toggle-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
        </svg>
      </button>
      <AnimatePresence exitBeforeEnter>
        {isOpen ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="sidebar-wrapper"
            key="sidebar-animation"
          >
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
