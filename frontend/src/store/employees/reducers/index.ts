import { combineReducers } from "redux";
import fetchEmployees from "./fetchEmployees";
import deleteEmployee from "./deleteEmployee";
import updateEmployee from "./updateEmployee";
import addEmployee from "./addEmployee";

const cafeReducers = combineReducers({
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
  addEmployee,
});
export default cafeReducers;
