import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader/Loader";

// Pages
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";

// Fetcher
import { fetcher } from "../../utils/fetcher";

const variantsLoader = {
  exit: {
    opacity: 0,
    transition: { type: "tween", duration: 1, delay: 0.5 },
  },
  initial: {
    opacity: 1,
    transition: { type: "tween", duration: 1 },
  },
  animate: {
    opacity: 1,
    transition: { type: "tween", duration: 1 },
  },
};
const variantsMain = {
  initial: {
    opacity: 0,
    transition: { type: "tween", duration: 1 },
  },
  animate: {
    opacity: 1,
    transition: { type: "tween", duration: .5 },
  },
};

export default function App() {
  // Products
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState(false);

  // Fetching
  useEffect(async () => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFetching(true);
    try {
      const data = await fetcher(
        `https://codepath-store-api.herokuapp.com/store`
      );
      setIsFetching(false);
      if (data.statusText != "OK") {
        setError(data.statusText);
      } else if (data.data.products.length == 0) {
        setError("Not products found");
      } else {
        // Everything ok
        setProducts(data.data.products);
      }
    } catch (error) {
      setError("Server error");
    }
  };

  // Handlers
  const handleAddItemToCart = (productId) => {
    let auxArray = [];
    let wasAdded = false;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId != productId) {
        auxArray.push(shoppingCart[i]);
      } else {
        auxArray.push({
          itemId: productId,
          quantity: shoppingCart[i].quantity + 1,
        });
        wasAdded = true;
      }
    }

    if (!wasAdded) {
      auxArray.push({
        itemId: productId,
        quantity: 1,
      });
    }

    setShoppingCart(auxArray);
  };

  const handleRemoveItemToCart = (productId) => {
    let auxArray = [];
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].itemId != productId) {
        auxArray.push(shoppingCart[i]);
      } else {
        if (shoppingCart[i].quantity - 1 > 0) {
          auxArray.push({
            itemId: productId,
            quantity: shoppingCart[i].quantity - 1,
          });
        }
      }
    }

    setShoppingCart(auxArray);
  };

  const handleOnCheckoutFormChange = () => {};
  const handleOnSubmitCheckoutForm = () => {};

  const handleOnToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="app">
      <BrowserRouter basename="/">
        <AnimatePresence exitBeforeEnter>
          {isFetching ? (
            <motion.div
              variants={variantsLoader}
              exit="exit"
              key="loader-app"
              animate="animate"
              initial="initial"
              className="loader-container"
            >
              <Loader />
            </motion.div>
          ) : (
            <motion.main
              variants={variantsMain}
              exit="exit"
              animate="animate"
              initial="initial"
            >
              <Navbar />
              <Sidebar
                isOpen={isOpen}
                shoppingCart={shoppingCart}
                products={products}
                checkoutForm={checkoutForm}
                handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                handleOnToggle={handleOnToggle}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      products={products}
                      handleAddItemToCart={handleAddItemToCart}
                      handleRemoveItemToCart={handleRemoveItemToCart}
                      shoppingCart={shoppingCart}
                    />
                  }
                />
                <Route
                  path="/products/:productId"
                  element={
                    <ProductDetail
                      shoppingCart={shoppingCart}
                      handleAddItemToCart={handleAddItemToCart}
                      handleRemoveItemToCart={handleRemoveItemToCart}
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.main>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}
