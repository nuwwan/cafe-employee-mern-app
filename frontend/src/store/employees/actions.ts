import { EmployeeType } from "../../utils/types";
import { ActionTypes, FailurePayload, SuccessPayload } from "./types";

const createAction = (
  type: string,
  payload?: SuccessPayload | string | undefined | EmployeeType | FailurePayload
) => ({
  type,
  payload,
});

export const fetchEmployeesRequest = (cafeId?: string) =>
  createAction(ActionTypes.FETCH_EMPLOYEES_REQUEST, cafeId);

export const fetchEmployeesSuccess = (payload: SuccessPayload) =>
  createAction(ActionTypes.FETCH_EMPLOYEES_SUCCESS, payload);

export const fetchEmployeesFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.FETCH_EMPLOYEES_FAILURE, payload);

export const addEmployeeRequest = (employee: EmployeeType) =>
  createAction(ActionTypes.ADD_EMPLOYEE_REQUEST, employee);

export const addEmployeeSuccess = (employee: EmployeeType) =>
  createAction(ActionTypes.ADD_EMPLOYEE_SUCCESS, employee);

export const addEmployeeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.ADD_EMPLOYEE_FAILURE, payload);

export const deleteEmployeeRequest = (id: string) =>
  createAction(ActionTypes.DELETE_EMPLOYEE_REQUEST, id);

export const deleteEmployeeSuccess = (id: EmployeeType) =>
  createAction(ActionTypes.DELETE_EMPLOYEE_SUCCESS, id);

export const deleteEmployeeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.DELETE_EMPLOYEE_FAILURE, payload);

export const updateEmployee = (employee: EmployeeType) =>
  createAction(ActionTypes.UPDATE_EMPLOYEE_REQUEST, employee);

export const updateEmployeeSuccess = (employee: EmployeeType) =>
  createAction(ActionTypes.UPDATE_EMPLOYEE_SUCCESS, employee);

export const updateEmployeeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.UPDATE_EMPLOYEE_FAILURE, payload);

export const addEmployeeReset = () =>
  createAction(ActionTypes.ADD_EMPLOYEE_RESET);

export const deleteEmployeeReset = () =>
  createAction(ActionTypes.DELETE_EMPLOYEE_RESET);

export const updateEmployeeReset = () =>
  createAction(ActionTypes.UPDATE_EMPLOYEE_RESET);
