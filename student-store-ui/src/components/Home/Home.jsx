import * as React from "react";
import "./Home.css";
import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid";
import { motion } from "framer-motion";
import { variantsMain } from "../Loader/variants";

export default function Home({
  products = [],
  handleAddItemToCart = () => {},
  handleRemoveItemToCart = () => {},
  shoppingCart,
}) {
  return (
    <motion.div
      variants={variantsMain}
      exit="exit"
      animate="animate"
      initial="initial"
      className="home"
    >
      <Hero />
      <ProductGrid
        products={products}
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemToCart={handleRemoveItemToCart}
        shoppingCart={shoppingCart}
      />
    </motion.div>
  );
}
