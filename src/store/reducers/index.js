import { combineReducers } from "redux";
import alert from "./alert";
import task from "./task";

export default combineReducers({
  alert,
  task,
});
