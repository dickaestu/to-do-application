import * as actionTypes from "../actions/actionTypes";
import { v4 as uuid } from "uuid";

export const setAlert = (msg, alertType) => {
  const id = uuid();
  return {
    type: actionTypes.SET_ALERT,
    payload: { msg, alertType, id },
  };
};

export const removeAlert = (timeout = 5000) => {
  const id = uuid();
  return {
    type: actionTypes.REMOVE_ALERT,
    payload: { id, timeout },
  };
};
