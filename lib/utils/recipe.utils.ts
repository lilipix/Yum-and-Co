export const formatQuantity = (quantity: number) => {
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  } else {
    return Math.round(quantity).toString();
  }
};
