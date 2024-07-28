import { all, fork } from "redux-saga/effects";

import cafeSaga from "./cafes/sagas";
import employeeSaga from "./employees/sagas";

export default function* rootSaga(): Generator {
  yield all([fork(cafeSaga), fork(employeeSaga)]);
}
