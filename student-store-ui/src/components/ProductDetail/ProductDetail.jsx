import { useState, useEffect } from "react";
import "./ProductDetail.css";
import { useParams } from "react-router-dom";

// Fetcher
import { fetcher } from "../../utils/fetcher";

// Components
import NotFound from "../NotFound/NotFound";
import ProductView from "../ProductView/ProductView";

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
    <div className="product-detail">
      {isFetching && <h1 className="loading">Loading...</h1>}
      {!isFetching && error == "" && (
        <ProductView
          product={product}
          productId={productId}
          handleAddItemToCart={handleAddItemToCart}
          handleRemoveItemToCart={handleRemoveItemToCart}
          quantity={getQuantity()}
        />
      )}
      {error != "" && <NotFound />}
    </div>
  );
}
