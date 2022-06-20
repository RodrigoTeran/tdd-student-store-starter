// Components
import { Fragment } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({
  products = [],
  handleAddItemToCart = () => {},
  handleRemoveItemToCart = () => {},
}) {
  return (
    <div className="product-grid">
      {products.map((product, index) => {
        return (
          <Fragment key={index}>
            <ProductCard product={product} showDescription={false} />
          </Fragment>
        );
      })}
    </div>
  );
}
