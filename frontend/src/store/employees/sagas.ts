import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { Employees } from "../../services/employees/employees";
import {
  addEmployeeFailure,
  addEmployeeSuccess,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  fetchEmployeesFailure,
  fetchEmployeesSuccess,
  updateEmployeeSuccess,
} from "./actions";
import {
  ActionTypes,
  AddEmployeeRequest,
  DeleteEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeesSagaType,
} from "./types";
import { FetchCafesRequest } from "../cafes/types";
import { employeeState } from "./selectors";
import { EmployeeType } from "../../utils/types";

function* fetchEmployeeSaga(action: FetchCafesRequest): EmployeesSagaType {
  const { payload } = action;
  const employee = new Employees();

  try {
    const response = yield call(employee.getEmployees, payload);
    yield put(
      fetchEmployeesSuccess({ employees: [...response.data.employees] })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchEmployeesFailure({ error: error.message }));
    }
  }
}

function* deleteEmployeeSaga(action: DeleteEmployeeRequest): EmployeesSagaType {
  const { payload } = action;
  const employee = new Employees();
  const employees: EmployeeType[] = yield select(employeeState);

  try {
    const response = yield call(employee.deleteEmployee, payload);

    const updatedEmployeeList = employees.filter(
      (employee) => employee.employeeId !== response.data.employee.employeeId
    );
    yield put(deleteEmployeeSuccess({ ...response.data.employee }));
    yield put(fetchEmployeesSuccess({ employees: [...updatedEmployeeList] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteEmployeeFailure({ error: error.message }));
    }
  }
}

function* updateEmployeeSaga(action: UpdateEmployeeRequest): EmployeesSagaType {
  const { payload } = action;
  const employee = new Employees();
  const employees: EmployeeType[] = yield select(employeeState);

  try {
    const response = yield call(employee.updateEmployee, payload);
    const updatedEmployeeList = employees.map((employee) =>
      employee.employeeId === payload.employeeId
        ? response.data.employee
        : employee
    );
    yield put(updateEmployeeSuccess({ ...response.data.employee }));
    yield put(fetchEmployeesSuccess({ employees: [...updatedEmployeeList] }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchEmployeesFailure({ error: error.message }));
    }
  }
}

function* addEmployeeSaga(action: AddEmployeeRequest): EmployeesSagaType {
  const { payload } = action;
  const employee = new Employees();
  const employees: EmployeeType[] = yield select(employeeState);

  try {
    const response = yield call(employee.addEmployee, payload);
    yield put(addEmployeeSuccess({ ...response?.data?.employee }));
    yield put(
      fetchEmployeesSuccess({
        employees: [response.data.employee, ...employees],
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(addEmployeeFailure({ error: error.message }));
    }
  }
}

function* employeesSaga() {
  yield all([
    takeEvery(ActionTypes.FETCH_EMPLOYEES_REQUEST, fetchEmployeeSaga),
    takeEvery(ActionTypes.DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga),
    takeEvery(ActionTypes.UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga),
    takeEvery(ActionTypes.ADD_EMPLOYEE_REQUEST, addEmployeeSaga),
  ]);
}

export default employeesSaga;
