import {
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
  } from "redux";
  import thunk from "redux-thunk";
  import { userReducer } from "./reducer";
  
  const rootReducer = combineReducers({
    gitUser: userReducer,
  });
  
  export const store = createStore(rootReducer, applyMiddleware(thunk));
  