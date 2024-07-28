import { CallEffect, PutEffect, SelectEffect } from "redux-saga/effects";
import { EmployeeType } from "../../utils/types";

export enum ActionTypes {
  FETCH_EMPLOYEES_REQUEST = "FETCH_EMPLOYEES_REQUEST",
  FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS",
  FETCH_EMPLOYEES_FAILURE = "FETCH_EMPLOYEES_FAILURE",
  FETCH_EMPLOYEES_RESET = "FETCH_EMPLOYEES_RESET",

  DELETE_EMPLOYEE_REQUEST = "DELETE_EMPLOYEE_REQUEST",
  DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS",
  DELETE_EMPLOYEE_FAILURE = "DELETE_EMPLOYEE_FAILURE",
  DELETE_EMPLOYEE_RESET = "DELETE_EMPLOYEE_RESET",

  UPDATE_EMPLOYEE_REQUEST = "UPDATE_EMPLOYEE_REQUEST",
  UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS",
  UPDATE_EMPLOYEE_FAILURE = "UPDATE_EMPLOYEE_FAILURE",
  UPDATE_EMPLOYEE_RESET = "UPDATE_EMPLOYEE_RESET",

  ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST",
  ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS",
  ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE",
  ADD_EMPLOYEE_RESET = "ADD_EMPLOYEE_RESET",
}

export interface EmployeesState {
  employees: EmployeeType[];
  error: string | null;
}

export interface SuccessPayload {
  employees: EmployeeType[];
}

export interface FailurePayload {
  error: string;
}

export interface FetchEmployeesRequest {
  type: ActionTypes.FETCH_EMPLOYEES_REQUEST;
  payload?: string;
}

export interface FetchEmployeesSuccess {
  type: ActionTypes.FETCH_EMPLOYEES_SUCCESS;
  payload: SuccessPayload;
}

export interface FetchEmployeesFailure {
  type: ActionTypes.FETCH_EMPLOYEES_FAILURE;
  payload: FailurePayload;
}

export interface AddEmployeeRequest {
  type: ActionTypes.ADD_EMPLOYEE_REQUEST;
  payload: EmployeeType;
}

export interface AddEmployeeSuccess {
  type: ActionTypes.ADD_EMPLOYEE_SUCCESS;
  payload: EmployeeType;
}

export interface AddEmployeeFailure {
  type: ActionTypes.ADD_EMPLOYEE_FAILURE;
  payload: FailurePayload;
}

export interface DeleteEmployeeRequest {
  type: ActionTypes.DELETE_EMPLOYEE_REQUEST;
  payload: string;
}

export interface DeleteEmployeeSuccess {
  type: ActionTypes.DELETE_EMPLOYEE_SUCCESS;
  payload: EmployeeType;
}

export interface DeleteEmployeeFailure {
  type: ActionTypes.DELETE_EMPLOYEE_FAILURE;
  payload: FailurePayload;
}

export interface UpdateEmployeeRequest {
  type: ActionTypes.UPDATE_EMPLOYEE_REQUEST;
  payload: EmployeeType;
}

export interface UpdateEmployeeSuccess {
  type: ActionTypes.UPDATE_EMPLOYEE_SUCCESS;
  payload: EmployeeType;
}

export interface UpdateEmployeeFailure {
  type: ActionTypes.UPDATE_EMPLOYEE_FAILURE;
  payload: FailurePayload;
}

export interface Reset {
  type:
    | ActionTypes.FETCH_EMPLOYEES_RESET
    | ActionTypes.DELETE_EMPLOYEE_RESET
    | ActionTypes.UPDATE_EMPLOYEE_RESET
    | ActionTypes.ADD_EMPLOYEE_RESET;
  payload: undefined;
}

export type EmployeeActions =
  | FetchEmployeesRequest
  | FetchEmployeesSuccess
  | FetchEmployeesFailure
  | DeleteEmployeeRequest
  | UpdateEmployeeRequest
  | AddEmployeeSuccess
  | AddEmployeeFailure
  | DeleteEmployeeSuccess
  | DeleteEmployeeFailure
  | UpdateEmployeeSuccess
  | UpdateEmployeeFailure
  | AddEmployeeRequest
  | Reset;

export type EmployeesSagaType = Generator<
  SelectEffect | CallEffect | PutEffect,
  void,
  any
>;
