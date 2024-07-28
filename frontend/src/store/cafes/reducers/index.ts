import { combineReducers } from "redux";

import deleteCafe from "./deleteCafe";
import addCafe from "./addCafe";
import fetchCafe from "./fetchCafe";
import updateCafe from "./updateCafe";

const cafeReducers = combineReducers({
  deleteCafe,
  addCafe,
  fetchCafe,
  updateCafe,
});

export default cafeReducers;
