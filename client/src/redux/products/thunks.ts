import axios from "axios";
import { API_URL } from "../../config";
import {
  getProductByIdStart,
  getProductByIdFail,
  getProductByIdSuccess,
  getProductsListFail,
  getProductsListStart,
  getProductsListSuccess
} from './actions';

/* thunk creators */
export const getProductsList = () => {
  return async (dispatch: any) => {
    dispatch(getProductsListStart());
    try {
      let res = await axios.get(`${API_URL}/products`);
      dispatch(getProductsListSuccess(res.data));
    } catch (e) {
      console.log(e);
      dispatch(getProductsListFail());
    }
  };
};

export const getProductById = (id: string) => {
  return async (dispatch: any) => {
    dispatch(getProductByIdStart());
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      dispatch(getProductByIdSuccess(res.data));
    } catch (e) {
      dispatch(getProductByIdFail());
    }
  };
};
