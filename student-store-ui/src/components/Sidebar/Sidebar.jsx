import * as React from "react";
import "./Sidebar.css";

import { AnimatePresence, motion } from "framer-motion";
import { containerVariants } from "./variants";

import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Loader from "../Loader/Loader";
import { variantsLoader } from "../Loader/variants";

export default function Sidebar({
  isOpen,
  shoppingCart,
  products,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  handleOnToggle,
  isFetchingCheckoutForm,
  error,
  successMsg,
  isReceiptOpen,
  setIsReceiptOpen,
  receipt,
  setReceipt
}) {
  return (
    <section className={`sidebar ${isOpen && "open"}`}>
      <button
        title="Toggle checkout form"
        onClick={handleOnToggle}
        className="toggle-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
        </svg>
      </button>

      {isReceiptOpen && receipt &&
        <div className="receipt">
          <h1>
            Receipt:
          </h1>
          <span className="receipt-text">
            {receipt.receiptText || "Receipt"}
          </span>
          <ShoppingCart
            isOpen
            products={products}
            shoppingCart={receipt.shoppingCart || []}
          />
          <button onClick={() => {
            setIsReceiptOpen(false);
            setReceipt({});
          }}>
            Close receipt
          </button>
        </div>
      }
      {!isReceiptOpen &&
        <AnimatePresence exitBeforeEnter>
          {isOpen && !isFetchingCheckoutForm ? (
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
                error={error}
                successMsg={successMsg}
              />
            </motion.div>
          ) : isFetchingCheckoutForm && isOpen ? (
            <motion.div
              variants={variantsLoader}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="sidebar-loader-wrapper"
            >
              <Loader />
            </motion.div>
          ) : null}
        </AnimatePresence>
      }
    </section>
  );
}
