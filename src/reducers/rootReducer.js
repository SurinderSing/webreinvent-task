import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import dataReducer from "../reducers/dataSlice";
import globalReducer from "../reducers/globalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  global: globalReducer,
  // Add other reducers as needed
});

export default rootReducer;
