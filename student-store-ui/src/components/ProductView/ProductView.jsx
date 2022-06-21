// Components
import ProductCard from "../ProductCard/ProductCard";
import "./ProductView.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { variantsMain } from "../Loader/variants";

export default function ProductView({
  product,
  productId,
  quantity,
  handleAddItemToCart,
  handleRemoveItemToCart,
}) {
  return (
    <>
      {product && (
        <motion.div
          variants={variantsMain}
          exit="exit"
          animate="animate"
          initial="initial"
          className="product-view"
        >
          <Link to="/" className="product-view-return">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
            </svg>
            return
          </Link>
          <h1 className="product-id">Product #{productId}</h1>
          <ProductCard
            product={product}
            showDescription={true}
            productId={productId}
            quantity={quantity}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemToCart={handleRemoveItemToCart}
          />
        </motion.div>
      )}
    </>
  );
}
