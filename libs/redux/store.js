import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  const store = createStore(
    reducer
    // composeWithDevTools(
    //   applyMiddleware(thunk),
    //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //     window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
  );

  return store;
};

export default configureStore;
