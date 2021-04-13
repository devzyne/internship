import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import uiReducers from "./reducers/uiReducers";
import dataReducers from "./reducers/dataReduers";

const initialState = {};
const middleware = [thunk];

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const reducers = combineReducers({
  UI: uiReducers,
  data: dataReducers,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistedState,
  compose(applyMiddleware(...middleware))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
