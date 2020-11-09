import {
  SubmitOrderStart,
  AddProductToCart,
  ChangeProductAmount,
  AddComments,
  RemoveFromCart,
  UpdateOrderData,
  LoadCartStart,
  SaveCart,
} from "./types";
import { ProductBasic } from '../products/types';

/* action name creator */
const reducerName = "CART";
const createActionName = (name: string) => `APP/${reducerName}/${name}`;

/* action types */
export const SUBMIT_ORDER_START = createActionName(
  "SUBMIT_ORDER_START"
);
export const SUBMIT_ORDER_SUCCESS = createActionName("SUBMIT_ORDER_SUCCESS");
export const SUBMIT_ORDER_FAIL = createActionName("SUBMIT_ORDER_FAIL");

export const ADD_PRODUCT = createActionName("ADD_PRODUCT");
export const CHANGE_PRODUCT_AMOUNT = createActionName("CHANGE_PRODUCT_AMOUNT");
export const ADD_COMMENTS = createActionName("ADD_COMMENTS");
export const UPDATE_ORDER_DATA = createActionName("UPDATE_ORDER_DATA");
export const REMOVE_PRODUCT = createActionName("REMOVE_PRODUCT");
export const UPDATE_TOTAL = createActionName("UPDATE_TOTAL");

export const LOAD_CART_START = createActionName("LOAD_CART_START");
export const LOAD_CART = createActionName("LOAD_CART");
export const SAVE_CART = createActionName("SAVE_CART");

/* action creators */
export const submitOrderStart= (): SubmitOrderStart => ({
  type: SUBMIT_ORDER_START,
});
export const addProductToCart = (
  product: ProductBasic,
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
export const updateOrderData = (value: string, field: string): UpdateOrderData => ({
  payload: { value, field },
  type: UPDATE_ORDER_DATA,
});
export const removeFromCart = (id: string): RemoveFromCart => ({
  payload: { id },
  type: REMOVE_PRODUCT,
});
export const loadCartStart = (): LoadCartStart => ({
  type: LOAD_CART_START,
});
export const saveCart = (): SaveCart => ({
  type: SAVE_CART,
});
