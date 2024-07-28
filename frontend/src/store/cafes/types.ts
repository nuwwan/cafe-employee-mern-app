import { CallEffect, PutEffect, SelectEffect } from "redux-saga/effects";
import { CafeType } from "../../utils/types";
import { Status } from "../../utils/constant";

export enum ActionTypes {
  FETCH_CAFES_REQUEST = "FETCH_CAFES_REQUEST",
  FETCH_CAFES_SUCCESS = "FETCH_CAFES_SUCCESS",
  CAFES_API_FAILURE = "CAFES_API_FAILURE",
  FETCH_RESET = "FETCH_RESET",

  DELETE_CAFE_REQUEST = "DELETE_CAFE_REQUEST",
  DELETE_CAFE_SUCCESS = "DELETE_CAFE_SUCCESS",
  DELETE_CAFE_FAILURE = "DELETE_CAFE_FAILURE",
  DELETE_RESET = "DELETE_RESET",

  UPDATE_CAFE_REQUEST = "UPDATE_CAFE_REQUEST",
  UPDATE_CAFE_SUCCESS = "UPDATE_CAFE_SUCCESS",
  UPDATE_CAFE_FAILURE = "UPDATE_CAFE_FAILURE",
  UPDATE_RESET = "UPDATE_RESET",

  ADD_CAFE_REQUEST = "ADD_CAFE_REQUEST",
  ADD_CAFE_SUCCESS = "ADD_CAFE_SUCCESS",
  ADD_CAFE_FAILURE = "ADD_CAFE_FAILURE",
  ADD_RESET = "ADD_RESET",
}

export type Cafe = CafeType;

export interface CafesState {
  fetchStatus: Status;
  addStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;
  cafes: Cafe[];
  error: string | null;
}

export interface SuccessPayload {
  cafes: Cafe[];
}

export interface FailurePayload {
  error: string;
}

export interface FetchCafesRequest {
  type: ActionTypes.FETCH_CAFES_REQUEST;
  payload?: string;
}

export interface FetchCafesSuccess {
  type: ActionTypes.FETCH_CAFES_SUCCESS;
  payload: SuccessPayload;
}

export interface AddCafeRequest {
  type: ActionTypes.ADD_CAFE_REQUEST;
  payload: Cafe;
}

export interface AddCafeSuccess {
  type: ActionTypes.ADD_CAFE_SUCCESS;
  payload: Cafe;
}

export interface UpdateCafeRequest {
  type: ActionTypes.UPDATE_CAFE_REQUEST;
  payload: Cafe;
}

export interface UpdateCafeSuccess {
  type: ActionTypes.UPDATE_CAFE_SUCCESS;
  payload: Cafe;
}

export interface ApiCafeFailure {
  type:
    | ActionTypes.UPDATE_CAFE_FAILURE
    | ActionTypes.CAFES_API_FAILURE
    | ActionTypes.DELETE_CAFE_FAILURE
    | ActionTypes.ADD_CAFE_FAILURE;
  payload: FailurePayload;
}

export interface DeleteCafeRequest {
  type: ActionTypes.DELETE_CAFE_REQUEST;
  payload: string;
}

export interface DeleteCafeSuccess {
  type: ActionTypes.DELETE_CAFE_SUCCESS;
  payload: Cafe;
}

export interface Reset {
  type:
    | ActionTypes.ADD_RESET
    | ActionTypes.DELETE_RESET
    | ActionTypes.UPDATE_RESET
    | ActionTypes.FETCH_RESET;
  payload: undefined;
}

export type CafesActions =
  | FetchCafesRequest
  | FetchCafesSuccess
  | DeleteCafeRequest
  | UpdateCafeRequest
  | AddCafeRequest
  | AddCafeSuccess
  | UpdateCafeSuccess
  | ApiCafeFailure
  | DeleteCafeSuccess
  | Reset;

export type CafesSagaType = Generator<
  SelectEffect | CallEffect | PutEffect,
  void,
  any
>;
