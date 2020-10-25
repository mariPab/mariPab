import {
  GetProductByIdSuccess,
  GetProductsListSuccess,
  GetProductByIdStart,
  GetProductsListStart,
  GetProductByIdFail,
  GetProductsListFail,
  Product,
} from "./types";
/* action name creator */
const reducerName = "PRODUCT";
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

/* action types */
export const GET_PRODUCTS_LIST_START = createActionName("GET_PRODUCTS_LIST_START");
export const GET_PRODUCTS_LIST_SUCCESS = createActionName("GET_PRODUCTS_LIST_SUCCESS");
export const GET_PRODUCTS_LIST_FAIL = createActionName("GET_PRODUCTS_LIST_FAIL");

export const GET_PRODUCT_BY_ID_START = createActionName("GET_PRODUCT_BY_ID");
export const GET_PRODUCT_BY_ID_SUCCESS = createActionName("GET_PRODUCT_BY_ID");
export const GET_PRODUCT_BY_ID_FAIL = createActionName("GET_PRODUCT_BY_ID");

export const RESET_ACTIVE_PRODUCT = createActionName("RESET_ACTIVE_PRODUCT");

/* action creators */
export const getProductsListStart = (): GetProductsListStart => ({
  type: GET_PRODUCTS_LIST_START
});
export const getProductsListSuccess = (products: Product[]): GetProductsListSuccess => ({
  payload: products, type: GET_PRODUCTS_LIST_SUCCESS
});
export const getProductsListFail = (): GetProductsListFail => ({
  type: GET_PRODUCTS_LIST_FAIL
});
export const getProductByIdStart = (): GetProductByIdStart => ({
  type: GET_PRODUCT_BY_ID_START
});
export const getProductByIdSuccess = (product: Product): GetProductByIdSuccess => ({
  payload: product,
  type: GET_PRODUCT_BY_ID_START
});
export const getProductByIdFail = (): GetProductByIdFail => ({
  type: GET_PRODUCT_BY_ID_FAIL
});
export const resetActiveProduct = () => ({
  type: RESET_ACTIVE_PRODUCT,
});

