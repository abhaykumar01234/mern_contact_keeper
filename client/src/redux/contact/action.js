import axios from "axios";
import {
  GET_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
} from "./types";

const config = {
  headers: { "content-type": "application/json" },
};

//get contacts
export const getContacts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/contacts", config);
    dispatch({ type: GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// add contact
export const addContact = (contact) => async (dispatch) => {
  try {
    const res = await axios.post("/api/contacts", contact, config);
    dispatch({ type: ADD_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// update contact
export const updateContact = (contact) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/contacts/${contact._id}`,
      contact,
      config
    );
    dispatch({ type: UPDATE_CONTACT, payload: res.data });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

// delete contact
export const deleteContact = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/contacts/${id}`);
    dispatch({ type: DELETE_CONTACT, payload: id });
  } catch (err) {
    dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
  }
};

export const clearContacts = () => (dispatch) =>
  dispatch({ type: CLEAR_CONTACTS });

export const setCurrent = (contact) => (dispatch) =>
  dispatch({ type: SET_CURRENT, payload: contact });

export const clearCurrent = () => (dispatch) =>
  dispatch({ type: CLEAR_CURRENT });

export const filterContacts = (text) => (dispatch) =>
  dispatch({ type: FILTER_CONTACTS, payload: text });

export const clearFilter = () => (dispatch) => dispatch({ type: CLEAR_FILTER });
