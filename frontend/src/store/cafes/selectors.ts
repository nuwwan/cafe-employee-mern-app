import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getCafes = (state: AppState) => state.cafes.fetchCafe;
const getAddCafe = (state: AppState) => state.cafes.addCafe;
const getDeleteCafe = (state: AppState) => state.cafes.deleteCafe;
const getUpdateCafe = (state: AppState) => state.cafes.updateCafe;

export const getCafesSelector = createSelector(getCafes, (cafes) => cafes);
export const getAddCafeSelector = createSelector(getAddCafe, (cafes) => cafes);
export const getDeleteCafeSelector = createSelector(
  getDeleteCafe,
  (cafes) => cafes
);
export const getUpdateCafeSelector = createSelector(
  getUpdateCafe,
  (cafes) => cafes
);
export const cafeState = (state: AppState) => state.cafes.fetchCafe.cafes;
