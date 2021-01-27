type CountProducts = (productList: Cart.CartProduct[]) => number;

class CartProductsCounter {
  public countProducts: CountProducts = productsList =>
    productsList.reduce((total, product) => product.amount + total, 0);
  public countTotalPrice: CountProducts = productsList =>
    productsList.reduce((total, product) =>
      product.price * product.amount + total, 0
    );
}

export default new CartProductsCounter();
