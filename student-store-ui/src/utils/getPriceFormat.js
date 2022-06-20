export const getPriceFormat = (price) => {
  const intPart = parseInt(price).toString();
  const auxFloatPart = (price - intPart).toFixed(2);
  const floatPart = auxFloatPart.substring(
    auxFloatPart.length - 2,
    auxFloatPart.length
  );

  return `$${intPart}.${floatPart}`;
};
