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
}) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  let { productId } = useParams();

  // Fetching
  useEffect(async () => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFetching(true);
    try {
      const data = await fetcher(
        `https://codepath-store-api.herokuapp.com/store/${productId}`
      );

      // id: 2,
      // name: 'Flamin Hot Cheetos',
      // category: 'food',
      // image: 'https://static.openfoodfacts.org/images/products/896/400/009/0879/front_en.14.full.jpg',
      // source: 'https://world.openfoodfacts.org/cgi/product_image.pl?code=8964000090879&id=front_en',
      // category: "food"
      // description: "No one knows what's in the powder that covers these snacks, but wow is it amazing!"
      // id: 2
      // image: "https://static.openfoodfacts.org/images/products/896/400/009/0879/front_en.14.full.jpg"
      // name: "Flamin Hot Cheetos"
      // price: 1.5
      // source: "https://world.openfoodfacts.org/cgi/product_image.pl?code=8964000090879&id=front_en"

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
      {!isFetching && error == "" && <ProductView product={product} />}
      {error != "" && <NotFound />}
    </div>
  );
}
