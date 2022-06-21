// Components
import { Fragment } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

export default function ProductGrid({
  products = [],
  handleAddItemToCart = () => {},
  handleRemoveItemToCart = () => {},
  shoppingCart,
}) {
  const getQuantity = (productId) => {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId == productId) {
        return shoppingCart[i].quantity;
      }
    }
    return 0;
  };

  return (
    <div className="product-grid">
      {products.map((product, index) => {
        return (
          <Fragment key={index}>
            <ProductCard
              product={product}
              showDescription={false}
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemToCart={handleRemoveItemToCart}
              productId={product.id}
              quantity={getQuantity(product.id)}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
