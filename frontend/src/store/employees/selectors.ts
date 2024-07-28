import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getEmployees = (state: AppState) => state.employees.fetchEmployees;
const addEmployee = (state: AppState) => state.employees.addEmployee;
const deleteEmployee = (state: AppState) => state.employees.deleteEmployee;
const updateEmployee = (state: AppState) => state.employees.updateEmployee;

export const getEmployeesSelector = createSelector(
  getEmployees,
  (employees) => employees
);

export const addEmployeeSelector = createSelector(
  addEmployee,
  (employee) => employee
);

export const deleteEmployeeSelector = createSelector(
  deleteEmployee,
  (employee) => employee
);

export const updateEmployeeSelector = createSelector(
  updateEmployee,
  (employee) => employee
);

export const employeeState = (state: AppState) =>
  state.employees.fetchEmployees.employees;
