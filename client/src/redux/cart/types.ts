import {
  ADD_PRODUCT,
  ADD_COMMENTS,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_AMOUNT,
  SUBMIT_ORDER_START,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL,
  LOAD_CART,
  UPDATE_ORDER_DATA,
  LOAD_CART_START,
  SAVE_CART,
} from './actions';

export interface SubmitOrderStart {
  type: typeof SUBMIT_ORDER_START;
  payload: { customer: Cart.Customer };
}
export interface SubmitOrderSuccess {
  type: typeof SUBMIT_ORDER_SUCCESS;
}
export interface SubmitOrderFail {
  type: typeof SUBMIT_ORDER_FAIL;
}
export interface AddProductToCart {
  type: typeof ADD_PRODUCT;
  payload: {
    product: Product.Product;
    amount: number;
  };
}
export interface AddComments {
  type: typeof ADD_COMMENTS;
  payload: {
    id: string;
    notes: string;
  };
}
export interface ChangeProductAmount {
  type: typeof CHANGE_PRODUCT_AMOUNT;
  payload: {
    id: string;
    amount: number;
  };
}
export interface RemoveFromCart {
  type: typeof REMOVE_PRODUCT;
  payload: {
    id: string;
  };
}
export interface LoadCart {
  type: typeof LOAD_CART;
  payload: Product.Product[];
}
export interface LoadCartStart {
  type: typeof LOAD_CART_START;
}
export interface SaveCart {
  type: typeof SAVE_CART;
}
