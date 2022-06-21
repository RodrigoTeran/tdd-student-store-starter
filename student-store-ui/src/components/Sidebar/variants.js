export const containerVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0,
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
  },
};
export const elementVariants = {
  hidden: {
    opacity: 0,
    x: 15,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 250 },
  },
  exit: {
    opacity: 0,
    y: 30,
  },
};
