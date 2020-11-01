import { CartProduct } from '../redux/cart/types';
type CountProducts = (productList: CartProduct[]) => number;
export const countProductsInCart: CountProducts = productsList => {
  return productsList.reduce((total, product) => product.amount + total, 0);
};
