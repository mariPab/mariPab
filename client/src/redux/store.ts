import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
// import { initialState } from "./initialState";
import productsReducer from "./products/reducer";
import { ProductStore } from "./products/types";
import cartReducer from "./cart/reducer";
import { CartStore } from "./cart/types";
// import { reducer as viewportReducer } from "./viewportRedux";

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

// add blank reducers for initial state properties without reducers
// Object.keys(initialState).forEach((item) => {
//   if (typeof reducers[item] == "undefined") {
//     reducers[item] = (statePart = null) => statePart;
//   }
// });

const reducers = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  // mobile: viewportReducer,
});

// create store
export const store = createStore(
  reducers,
  // initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
