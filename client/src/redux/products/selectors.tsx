export const getAll = ({ products }: RootState) => products.data;
export const getLoadingState = ({ products }: RootState) => products.loading;
export const getActiveProduct = ({ products }: RootState) => products.activeProduct;
export const getProductsState = ({ products }: RootState) => products;
