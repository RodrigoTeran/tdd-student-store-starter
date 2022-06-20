import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  productId,
  quantity,
  handleAddItemToCart,
  handleRemoveItemToCart,
  showDescription,
}) {
  const getPrice = () => {
    const intPart = parseInt(product.price).toString();
    const auxFloatPart = (product.price - intPart).toFixed(2);
    const floatPart = auxFloatPart.substring(
      auxFloatPart.length - 2,
      auxFloatPart.length
    );

    return `$${intPart}.${floatPart}`;
  };

  return (
    <div className="product-card">
      <div className="product-name">{product.name}</div>
      <div className="product-price">{getPrice()}</div>
      {showDescription && (
        <div className="product-description">{product.description}</div>
      )}
      <div className="media">
        <Link to={`/products/${productId}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <button
        onClick={() => {
          handleAddItemToCart(productId);
        }}
        className="add"
      >
        Add
      </button>
      <button
        onClick={() => {
          handleRemoveItemToCart(productId);
        }}
        className="remove"
      >
        Remove
      </button>
      {quantity > 0 && <div className="product-quantity">{quantity}</div>}
    </div>
  );
}
