import { motion } from "framer-motion";
import { elementVariants } from "../Sidebar/variants";
import "./CheckoutForm.css";

export default function CheckoutForm({
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
  error,
  successMsg,
}) {
  return (
    <motion.div variants={elementVariants} className="checkout-form">
      <input
        value={checkoutForm.email}
        type="email"
        name="email"
        placeholder="student@codepath.org"
        onChange={(e) => {
          handleOnCheckoutFormChange("email", e.target.value);
        }}
      />
      <input
        value={checkoutForm.name}
        type="text"
        name="name"
        placeholder="Student Name"
        onChange={(e) => {
          handleOnCheckoutFormChange("name", e.target.value);
        }}
      />
      <button onClick={handleOnSubmitCheckoutForm} className="checkout-button">
        Checkout
      </button>
      {error != "" && <div className="error">{error}</div>}
      {successMsg != "" && <div className="success">{successMsg}</div>}
    </motion.div>
  );
}
