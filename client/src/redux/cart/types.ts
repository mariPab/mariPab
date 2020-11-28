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
import { Product, ProductBasic } from '../products/types';

export interface CartProduct extends Product {
  amount: number;
  notes: string;
}
export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  place: string;
  postCode: string;
}

export interface CartStore {
  products: CartProduct[];
  orderProcessing: boolean;
  customer: Customer;
  total: number;
}

export interface OrderPayload {
  products: CartProduct[];
  client: any;
  total: number;
}
export interface SubmitOrderStart {
  type: typeof SUBMIT_ORDER_START;
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
export interface UpdateOrderData {
  type: typeof UPDATE_ORDER_DATA;
  payload: {
    value: string;
    field: string;
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
  payload: Product[];
}
export interface LoadCartStart {
  type: typeof LOAD_CART_START;
}
export interface SaveCart {
  type: typeof SAVE_CART;
}

export type CartReducerActionTypes =
  | SubmitOrderStart
  | SubmitOrderSuccess
  | SubmitOrderFail
  | AddProductToCart
  | AddComments
  | UpdateOrderData
  | ChangeProductAmount
  | RemoveFromCart
  | LoadCart;
