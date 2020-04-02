export const initialState = {
  products: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
  order: {
    products: [],
    client: null,
    total: 0,
  },
};
