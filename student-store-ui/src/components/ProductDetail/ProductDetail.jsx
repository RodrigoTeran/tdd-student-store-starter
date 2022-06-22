import { useState, useEffect } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Fetcher
import { fetcher } from "../../utils/fetcher";

// Components
import NotFound from "../NotFound/NotFound";
import ProductView from "../ProductView/ProductView";
import Loader from "../Loader/Loader";
import { variantsLoader, variantsMain } from "../Loader/variants";

export default function ProductDetail({
  handleAddItemToCart = () => {},
  handleRemoveItemToCart = () => {},
  shoppingCart,
}) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  let { productId } = useParams();

  // Fetching
  useEffect(async () => {
    loadData();
  }, []);

  const getQuantity = () => {
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId == productId) {
        return shoppingCart[i].quantity;
      }
    }
    return 0;
  };

  const loadData = async () => {
    setIsFetching(true);
    try {
      const data = await fetcher(
        `https://codepath-store-api.herokuapp.com/store/${productId}`
      );

      setIsFetching(false);
      if (data.status == 404) {
        setError("Product not found");
      } else {
        setProduct(data.data.product);
      }
    } catch (error) {
      setIsFetching(false);
      setError("Product not found");
    }
  };

  return (
    <motion.div
      variants={variantsMain}
      exit="exit"
      animate="animate"
      initial="initial"
      className="product-detail"
    >
      <AnimatePresence exitBeforeEnter>
        {isFetching ? (
          <motion.h1
            variants={variantsLoader}
            exit="exit"
            key="loader-product"
            animate="animate"
            initial="initial"
            className="loading"
          >
            <Loader />
          </motion.h1>
        ) : (
          <>
            {!isFetching && error == "" ? (
              <motion.div
                variants={variantsMain}
                exit="exit"
                animate="animate"
                initial="initial"
              >
                <ProductView
                  product={product}
                  productId={productId}
                  handleAddItemToCart={handleAddItemToCart}
                  handleRemoveItemToCart={handleRemoveItemToCart}
                  quantity={getQuantity()}
                />
              </motion.div>
            ) : (
              error != "" && <NotFound />
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
