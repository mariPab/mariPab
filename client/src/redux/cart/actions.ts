import { cartActionTypes, cartActionsInterfaces } from '.';

export const submitOrderStart= (customer: Cart.Customer): cartActionsInterfaces.SubmitOrderStart => ({
  type: cartActionTypes.SUBMIT_ORDER_START,
  payload: { customer },
});
export const addProductToCart = (
  product: Product.Product,
  amount: number
): cartActionsInterfaces.AddProductToCart => ({
  payload: { product, amount },
  type: cartActionTypes.ADD_PRODUCT,
});
export const changeProductAmount = (
  id: string,
  amount: number
): cartActionsInterfaces.ChangeProductAmount => ({
  payload: { id, amount },
  type: cartActionTypes.CHANGE_PRODUCT_AMOUNT,
});
export const addComments = (id: string, notes: string): cartActionsInterfaces.AddComments => ({
  payload: { id, notes },
  type: cartActionTypes.ADD_COMMENTS,
});
export const removeFromCart = (id: string): cartActionsInterfaces.RemoveFromCart => ({
  payload: { id },
  type: cartActionTypes.REMOVE_PRODUCT,
});
export const loadCartStart = (): cartActionsInterfaces.LoadCartStart => ({
  type: cartActionTypes.LOAD_CART_START,
});
export const saveCart = (): cartActionsInterfaces.SaveCart => ({
  type: cartActionTypes.SAVE_CART,
});
