import { combineReducers } from "redux";

import alertReducer from "./alert/reducer";
import authReducer from "./auth/reducer";
import contactReducer from "./contact/reducer";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  contacts: contactReducer,
});

export default rootReducer;
