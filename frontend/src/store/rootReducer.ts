import { combineReducers } from "redux";

import cafesReducer from "./cafes/reducers";
import employeesReducer from "./employees/reducers";

const rootReducer = combineReducers({
  cafes: cafesReducer,
  employees: employeesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
