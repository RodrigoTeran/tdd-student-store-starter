export default function CheckoutForm({
  isOpen,
  shoppingCart,
  checkoutForm,
  handleOnCheckoutFormChange,
  handleOnSubmitCheckoutForm,
}) {
  return (
    <div className="checkout-form">
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
      <button onclick={handleOnSubmitCheckoutForm} className="checkout-button">
        Checkout
      </button>

      {/* TODO */}
      <div className="error"></div>
    </div>
  );
}
