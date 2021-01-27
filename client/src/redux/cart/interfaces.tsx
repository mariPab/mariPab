import { cartActionTypes } from '.';

export interface SubmitOrderStart {
  type: typeof cartActionTypes.SUBMIT_ORDER_START;
  payload: { customer: Cart.Customer };
}
export interface SubmitOrderSuccess {
  type: typeof cartActionTypes.SUBMIT_ORDER_SUCCESS;
}
export interface SubmitOrderFail {
  type: typeof cartActionTypes.SUBMIT_ORDER_FAIL;
}
export interface AddProductToCart {
  type: typeof cartActionTypes.ADD_PRODUCT;
  payload: {
    product: Product.Product;
    amount: number;
  };
}
export interface AddComments {
  type: typeof cartActionTypes.ADD_COMMENTS;
  payload: {
    id: string;
    notes: string;
  };
}
export interface ChangeProductAmount {
  type: typeof cartActionTypes.CHANGE_PRODUCT_AMOUNT;
  payload: {
    id: string;
    amount: number;
  };
}
export interface RemoveFromCart {
  type: typeof cartActionTypes.REMOVE_PRODUCT;
  payload: {
    id: string;
  };
}
export interface LoadCart {
  type: typeof cartActionTypes.LOAD_CART;
  payload: Product.Product[];
}
export interface LoadCartStart {
  type: typeof cartActionTypes.LOAD_CART_START;
}
export interface SaveCart {
  type: typeof cartActionTypes.SAVE_CART;
}
