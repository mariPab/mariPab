export const countProductsInCart = productsList => {
  return productsList.reduce((total, product) => product.amount + total, 0);
};
