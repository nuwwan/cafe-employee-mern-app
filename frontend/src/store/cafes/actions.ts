import { ActionTypes, Cafe, FailurePayload, SuccessPayload } from "./types";

const createAction = (
  type: string,
  payload?: SuccessPayload | string | undefined | FailurePayload | Cafe
) => ({
  type,
  payload,
});

export const fetchCafesRequest = (term?: string) =>
  createAction(ActionTypes.FETCH_CAFES_REQUEST, term);

export const fetchCafesSuccess = (payload: SuccessPayload) =>
  createAction(ActionTypes.FETCH_CAFES_SUCCESS, payload);

export const cafesApiFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.CAFES_API_FAILURE, payload);

export const addCafeRequest = (cafe: Cafe) =>
  createAction(ActionTypes.ADD_CAFE_REQUEST, cafe);

export const addCafeSuccess = (cafe: Cafe) =>
  createAction(ActionTypes.ADD_CAFE_SUCCESS, cafe);

export const addCafeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.ADD_CAFE_FAILURE, payload);

export const updateCafeRequest = (cafe: Cafe) =>
  createAction(ActionTypes.UPDATE_CAFE_REQUEST, cafe);

export const updateCafeSuccess = (cafe: Cafe) =>
  createAction(ActionTypes.UPDATE_CAFE_SUCCESS, cafe);

export const updateCafeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.UPDATE_CAFE_FAILURE, payload);

export const deleteCafeRequest = (id: string) =>
  createAction(ActionTypes.DELETE_CAFE_REQUEST, id);

export const deleteCafeSuccess = (cafe: Cafe) =>
  createAction(ActionTypes.DELETE_CAFE_SUCCESS, cafe);

export const deleteCafeFailure = (payload: FailurePayload) =>
  createAction(ActionTypes.DELETE_CAFE_FAILURE, payload);

export const addEmployeeReset = () => createAction(ActionTypes.ADD_RESET);

export const updateEmployeeReset = () => createAction(ActionTypes.UPDATE_RESET);

export const deleteEmployeeReset = () => createAction(ActionTypes.DELETE_RESET);
