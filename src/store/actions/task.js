import { SET_TASK_START, SET_TASK_SUCCESS, SET_TASK_FAIL } from "./actionTypes";
import axios from "../../api/axios-orders";
import { setAlert } from "./alert";

export const getTask = () => async (dispatch) => {
  dispatch({
    type: SET_TASK_START,
  });
  try {
    const response = await axios.get(`/hanabyan/todo/1.0.0/to-do-list`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log(response.data);

    dispatch({
      type: SET_TASK_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SET_TASK_FAIL,
      error: error.response.data.message,
    });
    dispatch(setAlert(error.response.data.message, "error"));
  }
};
