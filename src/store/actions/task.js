import { SET_TASK_START, SET_TASK_SUCCESS, SET_TASK_FAIL } from "./actionTypes";
import axios from "../../api/axios-orders";
import { setAlert } from "./alert";

import moment from "moment";
import indonesiaLocale from "moment/locale/id";

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

export const createTask = (data, list) => (dispatch) => {
  moment.locale("id", indonesiaLocale);

  dispatch({
    type: SET_TASK_START,
  });

  const lastArr = list.slice(-1);
  let id;
  if (lastArr.length > 0) {
    id = lastArr[0].id + 1;
  } else {
    id = 1;
  }

  const formData = {
    ...data,
    id: id,
    status: 0,
    createdAt: moment().format("YYYY-MM-DD HH:mm"),
  };

  list.push(formData);

  dispatch({
    type: SET_TASK_SUCCESS,
    payload: list,
  });
};

export const updateTask = (data, list) => (dispatch) => {
  dispatch({
    type: SET_TASK_START,
  });

  const update = (data, value) => {
    const existingItem = data.find((item) => item.id === value.id);

    existingItem.description = value.description;
    existingItem.title = value.title;
  };

  update(list, data);

  dispatch({
    type: SET_TASK_SUCCESS,
    payload: list,
  });
};

export const deleteTask = (data, list, index) => (dispatch) => {
  dispatch({
    type: SET_TASK_START,
  });

  list.splice(index, 1);
  dispatch({
    type: SET_TASK_SUCCESS,
    payload: list,
  });
};
