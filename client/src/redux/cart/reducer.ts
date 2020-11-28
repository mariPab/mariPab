import {
  CartStore,
  CartReducerActionTypes,
  AddProductToCart,
  ChangeProductAmount,
  RemoveFromCart,
  AddComments,
  LoadCart,
  UpdateOrderData,
  CartProduct,
} from './types';
import { RootState } from '../store';
import {
  SUBMIT_ORDER_START,
  ADD_COMMENTS,
  ADD_PRODUCT,
  CHANGE_PRODUCT_AMOUNT,
  REMOVE_PRODUCT,
  SUBMIT_ORDER_SUCCESS,
  LOAD_CART,
  UPDATE_ORDER_DATA,
  UPDATE_TOTAL,
} from './actions';

/* selectors */
export const getCart = ({ cart }: RootState) => cart;
export const getProducts = ({ cart }: RootState) => cart.products;
export const getProductFromCart = ({ cart }: RootState, productId: string) =>
  cart.products.filter(product => product.id === productId)[0];
export const getTotalPrice = ({ cart }: RootState) =>
  cart.products.reduce(
    (total, product) => product.price * product.amount + total,
    0
  );
export const getCustomerData = ({ cart }: RootState) => cart.customer;
export const getProcessingState = ({ cart }: RootState) => cart.orderProcessing;

const initState: CartStore = {
  products: [],
  orderProcessing: false,
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    place: '',
    postCode: '',
  },
  total: 0,
};

export default function cartReducer(
  statePart: CartStore = initState,
  action: CartReducerActionTypes
): CartStore {
  switch (action.type) {
    case LOAD_CART:
      const { payload } = action as LoadCart;
      return {
        ...statePart,
        products: payload.length ? payload.map(({ tags, ...rest}) => ({
          ...rest,
        } as CartProduct
        )) : [],
      };
    case ADD_PRODUCT: {
      const { products } = statePart;
      const { payload } = action as AddProductToCart;
      if (products.length) {
        let isProductInCart = false;
        for (const item of products) {
          if (item.id === payload.product.id) isProductInCart = true;
        }
        return {
          ...statePart,
          products: isProductInCart
            ? [...products]
            : [...products, { ...payload.product, amount: payload.amount, notes: '' }],
        };
      } else {
        return {
          ...statePart,
          products: [{ ...payload.product, amount: payload.amount, notes: '' }],
        };
      }
    }
    case CHANGE_PRODUCT_AMOUNT: {
      const { payload } = action as ChangeProductAmount;
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === payload.id)
            return { ...product, amount: payload.amount };
          else return product;
        }),
      };
    }
    case ADD_COMMENTS: {
      const { payload } = action as AddComments;
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === payload.id)
            return { ...product, notes: payload.notes };
          else return product;
        }),
      };
    }
    case UPDATE_ORDER_DATA: {
      const { payload } = action as UpdateOrderData;
      return {
        ...statePart,
        customer: { ...statePart.customer, [payload.field]: payload.value },
      };
    }
    case REMOVE_PRODUCT: {
      const { payload } = action as RemoveFromCart;
      return {
        ...statePart,
        products: statePart.products.filter(
          (product) => product.id !== payload.id
        ),
      };
    }
    case UPDATE_TOTAL:
      return {
        ...statePart,
        total: statePart.products.reduce((total, product) =>
          product.price * product.amount + total,0),
      };
    case SUBMIT_ORDER_START: {
      return {
        ...statePart,
        orderProcessing: true,
      };
    }
    case SUBMIT_ORDER_SUCCESS:
      return {
        ...initState,
      };
    default:
      return statePart;
  }
}
