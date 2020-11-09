import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import productsReducer from "./products/reducer";
import { ProductStore } from "./products/types";
import cartReducer from "./cart/reducer";
import { CartStore } from "./cart/types";
// import { reducer as viewportReducer } from "./viewportRedux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export interface RootState {
  readonly products: ProductStore;
  readonly cart: CartStore;
  // mobile: viewportReducer;
}

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  // mobile: viewportReducer,
});

// create store
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
