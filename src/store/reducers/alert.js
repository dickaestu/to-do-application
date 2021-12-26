import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  open: false,
  payload: null,
};

const setAlert = (state, action) => {
  return updateObject(state, { open: true, payload: action.payload });
};

const removeAlert = (state, action) => {
  return updateObject(state, { open: false, payload: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return setAlert(state, action);
    case actionTypes.REMOVE_ALERT:
      return removeAlert(state, action);
    default:
      return state;
  }
};

export default reducer;
