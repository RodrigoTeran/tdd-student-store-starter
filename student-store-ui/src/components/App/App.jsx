import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

// Components
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

// Pages
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";

// Fetcher
import { fetcher } from "../../utils/fetcher";

export default function App() {
  // Products
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState(false);

  // category: "food"
  // description: "No one knows what's in the powder that covers these snacks, but wow is it amazing!"
  // id: 2
  // image: "https://static.openfoodfacts.org/images/products/896/400/009/0879/front_en.14.full.jpg"
  // name: "Flamin Hot Cheetos"
  // price: 1.5
  // source: "https://world.openfoodfacts.org/cgi/product_image.pl?code=8964000090879&id=front_en"

  useEffect(async () => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFetching(true);
    const data = await fetcher(
      `https://codepath-store-api.herokuapp.com/store`
    );
    setIsFetching(false);
    // config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
    // data: {products: Array(16)}
    // headers: {content-length: '5667', content-type: 'application/json; charset=utf-8'}
    // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    // status: 200
    // statusText: "OK"
    if (data.statusText != "OK") {
      setError(data.statusText);
    } else if (data.data.products.length == 0) {
      setError("Not products found");
    }
    else {
      // Everything ok
      setProducts(data.data.products);
    }
  };

  return (
    <div className="app">
      <BrowserRouter basename="/">
        <main>
          <Navbar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
