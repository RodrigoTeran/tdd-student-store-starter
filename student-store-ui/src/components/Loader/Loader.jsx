import "./Loader.css";
import { motion } from "framer-motion";

const bounceTransition = (initialDelay) => {
  return {
    y: {
      duration: 0.4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeOut",
      delay: initialDelay,
    },
    backgroundColor: {
      duration: 0,
      repeatType: "mirror",
      repeat: Infinity,
      ease: "easeOut",
      repeatDelay: 0.8,
    },
  };
};

const variants = {
  exit: {
    opacity: 0,
    transition: { type: "tween", duration: 1, delay: 0.5 },
  },
  initial: {
    opacity: 1,
    transition: { type: "tween", duration: 1 },
  },
};

const Loader = ({ class_wrap = "", class_children = "" }) => {
  return (
    <motion.div
      className={`loader ${class_wrap}`}
      variants={variants}
      exit="exit"
      animate="animate"
      initial="initial"
    >
      <motion.div
        transition={bounceTransition(0)}
        animate={{
          y: ["100%", "-100%"],
        }}
        className={class_children}
      ></motion.div>
      <motion.div
        transition={bounceTransition(0.08)}
        animate={{
          y: ["100%", "-100%"],
        }}
        className={class_children}
      ></motion.div>
      <motion.div
        transition={bounceTransition(0.16)}
        animate={{
          y: ["100%", "-100%"],
        }}
        className={class_children}
      ></motion.div>
    </motion.div>
  );
};
export default Loader;
