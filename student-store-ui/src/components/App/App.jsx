import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader/Loader";
import { variantsLoader, variantsMain } from "../Loader/variants";

// Pages
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";

// Fetcher
import { fetcher } from "../../utils/fetcher";

export default function App() {
  // Products
  const [productsPerm, setProductsPerm] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingCheckoutForm, setIsFetchingCheckoutForm] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    email: "",
    name: "",
  });

  // Fetching
  useEffect(async () => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsFetching(true);
    try {
      const data = await fetcher(
        `${import.meta.env.VITE_API_URL}/store`
      );
      setIsFetching(false);
      if (data.status != 200) {
        setError(data.statusText);
      } else if (data.data.products.length == 0) {
        setError("Not products found");
      } else {
        // Everything ok
        setProducts(data.data.products);
        setProductsPerm(data.data.products);
      }
    } catch (error) {
      setIsFetching(false);
      console.error(error);
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

  const handleOnCheckoutFormChange = (name, value) => {
    const prev = checkoutForm;
    const _new = {
      ...prev,
      [name]: value,
    };

    setCheckoutForm(_new);
  };
  const handleOnSubmitCheckoutForm = async () => {
    setIsFetchingCheckoutForm(true);
    try {
      if (checkoutForm.email == "" || checkoutForm.name == "") {
        setError("You need to complete the information!");
        setIsFetchingCheckoutForm(false);
        return;
      }
      if (shoppingCart.length == 0) {
        setError("You need to select at least 1 item!");
        setIsFetchingCheckoutForm(false);
        return;
      }

      const data = await fetcher(
        `${import.meta.env.VITE_API_URL}/store`,
        "post",
        {},
        {
          user: checkoutForm,
          shoppingCart,
        }
      );

      setIsFetchingCheckoutForm(false);
      if (data.status != 201) {
        setError("Server error");
        setSuccessMsg("");
        return;
      }
      setError("");
      setSuccessMsg("Success!");

      // Empty shopping cart
      setShoppingCart([]);

      // Reset checkoutForm
      setCheckoutForm({
        email: "",
        name: "",
      });
    } catch (error) {
      setIsFetching(false);
      console.error(error);
      setError("Server error");
    }
  };

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
                products={productsPerm}
                checkoutForm={checkoutForm}
                handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                handleOnToggle={handleOnToggle}
                isFetchingCheckoutForm={isFetchingCheckoutForm}
                error={error}
                successMsg={successMsg}
              />
              <AnimatePresence exitBeforeEnter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Home
                        products={products}
                        productsPerm={productsPerm}
                        setProducts={setProducts}
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
              </AnimatePresence>
            </motion.main>
          )}
        </AnimatePresence>
      </BrowserRouter>
    </div>
  );
}
