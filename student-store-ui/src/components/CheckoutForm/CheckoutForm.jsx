import { motion } from "framer-motion";
import { elementVariants } from "../Sidebar/variants";
import "./CheckoutForm.css";

export default function CheckoutForm({
  isOpen,
  shoppingCart,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) {
  return (
    <motion.div variants={elementVariants} className="checkout-form">
      <input
        value={checkoutForm.email}
        type="email"
        name="email"
        placeholder="student@codepath.org"
        onChange={handleOnCheckoutFormChange}
      />
      <input
        value={checkoutForm.name}
        type="text"
        name="name"
        placeholder="Student Name"
        onChange={handleOnCheckoutFormChange}
      />
      <button onClick={handleOnSubmitCheckoutForm} className="checkout-button">
        Checkout
      </button>

      {/* TODO */}
      <div className="error"></div>
    </motion.div>
  );
}
