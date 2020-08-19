import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuidv4 } from "uuid";

// Actions
export const setAlert = (message, type, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: SET_ALERT, payload: { message, type, id } });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: { id } }), timeout);
};
