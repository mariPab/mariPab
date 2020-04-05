export const initialState = {
  products: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  openedProduct: null,
  cart: {
    products: [],
    total: 0,
  },
};
