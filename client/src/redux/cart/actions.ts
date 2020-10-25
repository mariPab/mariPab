import {
  SubmitOrderStartProcessing,
  SubmitOrderSuccess,
  SubmitOrderFail,
  AddProductToCart,
  ChangeProductAmount,
  AddComments,
  RemoveFromCart,
  LoadCart,
  CartProduct,
} from "./types";

/* action name creator */
const reducerName = "CART";
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

/* action types */
export const SUBMIT_ORDER_START_PROCESSING = createActionName(
  "SUBMIT_ORDER_START_PROCESSING"
);
export const SUBMIT_ORDER_SUCCESS = createActionName("SUBMIT_ORDER_SUCCESS");
export const SUBMIT_ORDER_FAIL = createActionName("SUBMIT_ORDER_FAIL");

export const ADD_PRODUCT = createActionName("ADD_PRODUCT");
export const CHANGE_PRODUCT_AMOUNT = createActionName("CHANGE_PRODUCT_AMOUNT");
export const ADD_COMMENTS = createActionName("ADD_COMMENTS");
export const REMOVE_PRODUCT = createActionName("REMOVE_PRODUCT");

export const LOAD_CART = createActionName("LOAD_CART");

/* action creators */
export const submitOrderStartProcessing = (): SubmitOrderStartProcessing => ({
  type: SUBMIT_ORDER_START_PROCESSING,
});
export const submitOrderSuccess = (): SubmitOrderSuccess => ({
  type: SUBMIT_ORDER_SUCCESS,
});
export const submitOrderFail = (): SubmitOrderFail => ({
  type: SUBMIT_ORDER_FAIL,
});
export const addProductToCart = (
  product: CartProduct,
  amount: number
): AddProductToCart => ({
  payload: { product, amount },
  type: ADD_PRODUCT,
});
export const changeProductAmount = (
  id: string,
  amount: number
): ChangeProductAmount => ({
  payload: { id, amount },
  type: CHANGE_PRODUCT_AMOUNT,
});
export const addComments = (id: string, notes: string): AddComments => ({
  payload: { id, notes },
  type: ADD_COMMENTS,
});
export const removeFromCart = (id: string): RemoveFromCart => ({
  payload: { id },
  type: REMOVE_PRODUCT,
});
export const loadCart = (data: CartProduct[]): LoadCart => ({
  payload: data,
  type: LOAD_CART,
});
