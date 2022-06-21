export const variantsLoader = {
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
export const variantsMain = {
  initial: {
    opacity: 0,
    transition: { type: "tween", duration: 1 },
  },
  animate: {
    opacity: 1,
    transition: { type: "tween", duration: 0.5 },
  },
};
