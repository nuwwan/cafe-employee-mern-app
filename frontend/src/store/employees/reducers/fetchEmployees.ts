import { produce } from "immer";

import { Status } from "../../../utils/constant";
import { EmployeeActions, ActionTypes } from "../types";
import { EmployeeType } from "../../../utils/types";

interface InitialStateType {
  status: Status;
  employees: EmployeeType[];
  error: string | null;
}

const initialState: InitialStateType = {
  status: Status.IDEAL,
  employees: [],
  error: null,
};

const reducer = (state = initialState, { type, payload }: EmployeeActions) =>
  produce(state, (draft) => {
    switch (type) {
      case ActionTypes.FETCH_EMPLOYEES_REQUEST:
        draft.status = Status.LOADING;
        break;
      case ActionTypes.FETCH_EMPLOYEES_SUCCESS:
        draft.status = Status.SUCCESS;
        draft.employees = payload.employees;
        draft.error = null;
        break;
      case ActionTypes.FETCH_EMPLOYEES_FAILURE:
        draft.status = Status.FAILURE;
        draft.error = payload.error;
        break;
      default:
        break;
    }
  });

export default reducer;
