import * as React from "react";
import "./NotFound.css";
import { motion } from "framer-motion";
import { variantsMain } from "../Loader/variants";

export default function NotFound() {
  return (
    <motion.div
      variants={variantsMain}
      exit="exit"
      animate="animate"
      initial="initial"
      className="notFound"
    >
      <img title="Page Not Found 404" src="/404.svg" alt="Page not found" />
    </motion.div>
  );
}
