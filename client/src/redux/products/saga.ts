import axios from 'axios';
import { API_URL } from '../../settings/config';
import { productActionsInterfaces, productActionTypes, productSelectors } from '.';
import { takeEvery, put, all, fork, select } from 'redux-saga/effects';
import UrlBuilder from '../../helpers/urlBuilder';
import CodesHandler from '../../helpers/codesHandler';

const { build } = UrlBuilder;

export function* getProductsListWatcher(): Generator {
  yield takeEvery(productActionTypes.GET_PRODUCTS_LIST_START, getProductsList);
}
export function* getProductsList() {
  try {
    const { search, init, activeTags } = (yield select(productSelectors.getProductsState)) as Product.Store;
    const requestParams = { search, activeTags };
    const address = build(`${API_URL}/products/all`, requestParams);
    const res = yield axios.get(address);
    const data = res.data.map((item: any) => ({
      ...item, id: item._id,
    })) as Product.Product[];
    yield put({
      type: productActionTypes.GET_PRODUCTS_LIST_SUCCESS,
      payload: data
    });
    if (init) {
      const tags: string[] = [];
      data.forEach(item => {
        if (item.tags) {
          item.tags.forEach(tag => tags.push(tag));
        }
      });
      yield put({
        type: productActionTypes.SET_AVAILABLE_TAGS,
        payload: tags.filter((item, idx) => tags.indexOf(item) == idx),
      });
      yield put({ type: productActionTypes.INIT_PRODUCTS_FINISH });

    }
  } catch (err) {
    console.log(err);
    yield put({ type: productActionTypes.GET_PRODUCTS_LIST_FAIL });
    yield CodesHandler.executeErrorCodes(err.response.data.errorCode);
  }
}

export function* getProductByIdWatcher(): Generator {
  yield takeEvery(productActionTypes.GET_PRODUCT_BY_ID_START, getProductById);
}
export function* getProductById({ payload }: productActionsInterfaces.GetProductByIdStart) {
  try {
    const res = yield axios.get(`${API_URL}/products/product/${payload.id}`);
    const data = { ...res.data, id: res.data._id };
    delete data._id;
    yield put({
      type: productActionTypes.GET_PRODUCT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({ type: productActionTypes.GET_PRODUCT_BY_ID_FAIL });
  }
}

export function* refreshProductsListWatcher(): Generator {
  yield takeEvery([
    productActionTypes.SET_SEARCH_VALUE,
    productActionTypes.SET_ACTIVE_TAGS
  ], refreshProductsList);
}
export function* refreshProductsList() {
  yield put({
    type: productActionTypes.GET_PRODUCTS_LIST_START,
  });
}

export default function* rootSaga(): Generator {
  yield all([
    fork(getProductsListWatcher),
    fork(getProductByIdWatcher),
    fork(refreshProductsListWatcher),
  ]);
}
