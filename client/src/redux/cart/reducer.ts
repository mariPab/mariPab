import { AnyAction } from 'redux';
import { cartActionTypes, cartActionsInterfaces } from '.';

const initState: Cart.Store = {
  products: [],
  orderProcessing: false,
  total: 0,
};

export default function cartReducer(
  statePart: Cart.Store = initState,
  action: AnyAction
): Cart.Store {
  switch (action.type) {
    case cartActionTypes.LOAD_CART:
      const { payload } = action as cartActionsInterfaces.LoadCart;
      return {
        ...statePart,
        products: payload.length ? payload.map(({ tags, ...rest}) => ({
          ...rest,
        } as Cart.CartProduct
        )) : [],
      };
    case cartActionTypes.ADD_PRODUCT: {
      const { products } = statePart;
      const { payload } = action as cartActionsInterfaces.AddProductToCart;
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
    case cartActionTypes.CHANGE_PRODUCT_AMOUNT: {
      const { payload } = action as cartActionsInterfaces.ChangeProductAmount;
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === payload.id)
            return { ...product, amount: payload.amount };
          else return product;
        }),
      };
    }
    case cartActionTypes.ADD_COMMENTS: {
      const { payload } = action as cartActionsInterfaces.AddComments;
      return {
        ...statePart,
        products: statePart.products.map((product) => {
          if (product.id === payload.id)
            return { ...product, notes: payload.notes };
          else return product;
        }),
      };
    }
    case cartActionTypes.REMOVE_PRODUCT: {
      const { payload } = action as cartActionsInterfaces.RemoveFromCart;
      return {
        ...statePart,
        products: statePart.products.filter(
          (product) => product.id !== payload.id
        ),
      };
    }
    case cartActionTypes.UPDATE_TOTAL:
      return {
        ...statePart,
        total: statePart.products.reduce((total, product) =>
          product.price * product.amount + total,0),
      };
    case cartActionTypes.SUBMIT_ORDER_START: {
      return {
        ...statePart,
        orderProcessing: true,
      };
    }
    case cartActionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...initState,
      };
    default:
      return statePart;
  }
}
