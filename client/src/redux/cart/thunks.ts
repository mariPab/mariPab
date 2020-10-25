import axios from "axios";
import { API_URL } from "../../config";
import { AppThunk } from "../store";
import {
  submitOrderStartProcessing,
  submitOrderSuccess,
  loadCart,
} from "./actions";
import { OrderPayload, CartProduct } from "./types";

/* thunk creators */
export const submitOrder = (data: OrderPayload): AppThunk => async (
  dispatch
) => {
  dispatch(submitOrderStartProcessing());
  try {
    await axios.post(`${API_URL}/order`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(submitOrderSuccess());
  } catch (e) {
    console.log(e);
    // dispatch(fetchError(e.message));
  }
};

export const saveCart = (data: CartProduct[]): AppThunk => {
  return () => {
    localStorage.setItem("cart", JSON.stringify(data));
  };
};

export const loadCartRequest = (): AppThunk => {
  const getSavedCart = localStorage.getItem("cart");
  return (dispatch) => {
    getSavedCart
      ? dispatch(loadCart(JSON.parse(getSavedCart)))
      : dispatch(loadCart([]));
  };
};
