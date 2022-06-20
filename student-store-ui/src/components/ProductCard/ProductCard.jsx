import { Link } from "react-router-dom";
import { getPriceFormat } from "../../utils/getPriceFormat";

export default function ProductCard({
  product,
  productId,
  quantity,
  handleAddItemToCart,
  handleRemoveItemToCart,
  showDescription,
}) {
  return (
    <div className="product-card">
      <div className="product-name">{product.name}</div>
      <div className="product-price">{getPriceFormat(product.price)}</div>
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
