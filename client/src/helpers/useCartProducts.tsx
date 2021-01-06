import { useState, useEffect } from 'react';
import { CartProduct } from '../redux/cart/types';
import CartProductsCounter from './cartProductsCounter';

export function useCartProducts(products: CartProduct[]) {
  const [total, setTotal] = useState(CartProductsCounter.countTotalPrice(products));
  const [productsAmount, setProductsAmount] = useState(CartProductsCounter.countProducts(products));
  useEffect(() => {
    setTotal(CartProductsCounter.countTotalPrice(products));
    setProductsAmount(CartProductsCounter.countProducts(products));
  }, [products, products.length]);
  return { total, productsAmount };
}
