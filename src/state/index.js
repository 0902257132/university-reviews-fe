import { createStore } from "redux";
import { appReducer } from "./ducks";
import { ENVIRONMENT } from "query/config";

export default function configureStore(initialState = {}) {
  if (ENVIRONMENT === "dev") {
    return createStore(
      appReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return createStore(appReducer, initialState);
}
