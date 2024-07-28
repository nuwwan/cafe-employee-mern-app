import { all, put, takeEvery, call, select } from "redux-saga/effects";
import { Cafes } from "../../services/cafes/cafes";
import {
  addCafeFailure,
  addCafeSuccess,
  cafesApiFailure,
  deleteCafeSuccess,
  fetchCafesSuccess,
  updateCafeFailure,
  updateCafeSuccess,
} from "./actions";
import {
  ActionTypes,
  AddCafeRequest,
  Cafe,
  CafesSagaType,
  DeleteCafeRequest,
  FetchCafesRequest,
  UpdateCafeRequest,
} from "./types";
import { cafeState } from "./selectors";

function* fetchCafesSaga(action: FetchCafesRequest): CafesSagaType {
  const { payload } = action;
  const cafe = new Cafes();
  try {
    const response = yield call(cafe.getCafes, payload);
    yield put(fetchCafesSuccess({ cafes: [...response.data.cafes] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(cafesApiFailure({ error: error.message }));
    }
  }
}

function* deleteCafeSaga(action: DeleteCafeRequest): CafesSagaType {
  const { payload } = action;
  const cafe = new Cafes();
  const cafes: Cafe[] = yield select(cafeState);

  try {
    const response = yield call(cafe.deleteCafe, payload);
    const updatedCafeList = cafes.filter(
      (cafe) => cafe.cafeId !== response.data.cafe.cafeId
    );

    yield put(deleteCafeSuccess({ ...response.data.cafe }));
    yield put(fetchCafesSuccess({ cafes: [...updatedCafeList] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(cafesApiFailure({ error: error.message }));
    }
  }
}

function* updateCafeSaga(action: UpdateCafeRequest): CafesSagaType {
  const { payload } = action;
  const cafe = new Cafes();
  const cafes: Cafe[] = yield select(cafeState);
  try {
    const response = yield call(cafe.updateCafe, payload);
    const updatedCafeList = cafes.map((cafe) =>
      cafe.cafeId === response.data.cafe.cafeId ? response.data.cafe : cafe
    );

    yield put(updateCafeSuccess({ ...response.data.cafe }));
    yield put(fetchCafesSuccess({ cafes: [...updatedCafeList] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateCafeFailure({ error: error.message }));
    }
  }
}

function* addCafeSaga(action: AddCafeRequest): CafesSagaType {
  const { payload } = action;
  const cafe = new Cafes();
  const cafes: Cafe[] = yield select(cafeState);
  try {
    const response = yield call(cafe.addCafe, payload);
    yield put(addCafeSuccess({ ...response.data.cafe }));
    yield put(fetchCafesSuccess({ cafes: [...cafes, response.data.cafe] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(addCafeFailure({ error: error.message }));
    }
  }
}

function* cafesSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_CAFES_REQUEST, fetchCafesSaga),
    takeEvery(ActionTypes.DELETE_CAFE_REQUEST, deleteCafeSaga),
    takeEvery(ActionTypes.UPDATE_CAFE_REQUEST, updateCafeSaga),
    takeEvery(ActionTypes.ADD_CAFE_REQUEST, addCafeSaga),
  ]);
}

export default cafesSaga;
