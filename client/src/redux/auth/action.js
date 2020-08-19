import axios from "axios";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

const config = {
  headers: { "Content-Type": "application/json" },
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users", formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    loadUser(dispatch);
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth", formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    loadUser(dispatch);
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
  }
};

export const logout = () => ({ type: LOGOUT });

export const clearErrors = () => ({ type: CLEAR_ERRORS });

// helper functions
export const loadUser = async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["x-auth-token"] = token;
  else delete axios.defaults.headers.common["x-auth-token"];
};
