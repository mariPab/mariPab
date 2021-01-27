export const getCart = ({ cart }: RootState) => cart;
export const getProducts = ({ cart }: RootState) => cart.products;
export const getProductFromCart = ({ cart }: RootState, productId: string) =>
  cart.products.filter(product => product.id === productId)[0];
export const getTotalPrice = ({ cart }: RootState) =>
  cart.products.reduce(
    (total, product) => product.price * product.amount + total,
    0
  );
export const getProcessingState = ({ cart }: RootState) => cart.orderProcessing;
