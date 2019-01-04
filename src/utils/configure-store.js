import { createStore, applyMiddleware, compose } from "redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import DevTools from "./dev-tools";

import rootReducer from "../reducers/root-reducer";

const configureStore = () => {
  let store = {};

  if (process.env.NODE_ENV !== "production") {
    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk, logger),
        persistState("events"),
        DevTools.instrument()
      )
    );
  } else {
    store = createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk),
        persistState("events")
      )
    );
  }

  return store;
};

export default configureStore;
