import { Link } from "react-router-dom";
import { getPriceFormat } from "../../utils/getPriceFormat";
import "./ProductCard.css";

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
      <div className="media" title={`Go to ${product.name}`}>
        <Link to={`/products/${productId}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      <div className="product-name">{product.name}</div>
      <div className="product-price">{getPriceFormat(product.price)}</div>
      {showDescription && (
        <div className="product-description">{product.description}</div>
      )}
      <div className="product-btns">
        <button
          title="Add item"
          onClick={() => {
            handleAddItemToCart(productId);
          }}
          className="add"
        >
          +
        </button>
        <button
          title="Remove item"
          onClick={() => {
            handleRemoveItemToCart(productId);
          }}
          className="remove"
        >
          -
        </button>
      </div>
      {quantity > 0 && (
        <div
          title={`You have ${quantity} ${product.name} in your shopping cart!`}
          className="product-quantity"
        >
          {quantity}
        </div>
      )}
    </div>
  );
}
