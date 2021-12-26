import {
  SET_TASK_START,
  SET_TASK_FAIL,
  SET_TASK_SUCCESS,
} from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

const start = (state, action) => {
  return updateObject(state, { error: false, loading: true });
};

const success = (state, action) => {
  return updateObject(state, {
    data: action.payload,
    loading: false,
    error: false,
  });
};

const fail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_START:
      return start(state, action);
    case SET_TASK_SUCCESS:
      return success(state, action);
    case SET_TASK_FAIL:
      return fail(state, action);
    default:
      return state;
  }
};

export default reducer;
