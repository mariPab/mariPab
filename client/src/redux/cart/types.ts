import {
  ADD_PRODUCT,
  ADD_COMMENTS,
  REMOVE_PRODUCT,
  CHANGE_PRODUCT_AMOUNT,
  SUBMIT_ORDER_START_PROCESSING,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL,
  LOAD_CART,
} from "./actions";
import { Product, ProductBasic } from '../products/types';

export interface CartProduct extends Product {
  amount: number;
  notes: string;
}
export interface CartStore {
  products: CartProduct[];
  orderProcessing: boolean;
}

export interface OrderPayload {
  products: CartProduct[];
  client: any;
  total: number;
}
export interface SubmitOrderStartProcessing {
  type: typeof SUBMIT_ORDER_START_PROCESSING;
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
    product: ProductBasic;
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
  payload: CartProduct[];
}
export type CartReducerActionTypes =
  | SubmitOrderStartProcessing
  | SubmitOrderSuccess
  | SubmitOrderFail
  | AddProductToCart
  | AddComments
  | ChangeProductAmount
  | RemoveFromCart
  | LoadCart;
