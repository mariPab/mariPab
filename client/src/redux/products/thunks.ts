import axios from "axios";
import { API_URL } from "../../settings/config";
import {
  getProductByIdStart,
  getProductByIdFail,
  getProductByIdSuccess,
  getProductsListFail,
  getProductsListStart,
  getProductsListSuccess
} from './actions';
import { Product } from "./types";

/* thunk creators */
export const getProductsList = () => {
  return async (dispatch: any) => {
    dispatch(getProductsListStart());
    try {
      const res = await axios.get(`${API_URL}/products`);
      const data = res.data.map((item: any) => ({
        ...item, id: item._id
      })) as Product[];
      dispatch(getProductsListSuccess(data));
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
      const data = { ...res.data, id: res.data._id };
      delete data._id;
      dispatch(getProductByIdSuccess(data));
    } catch (e) {
      dispatch(getProductByIdFail());
    }
  };
};
