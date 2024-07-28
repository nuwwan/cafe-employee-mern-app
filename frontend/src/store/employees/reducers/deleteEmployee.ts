import { produce } from "immer";

import { Status } from "../../../utils/constant";
import { EmployeeActions, ActionTypes } from "../types";
import { EmployeeType } from "../../../utils/types";

interface InitialStateType {
  status: Status;
  employee: EmployeeType | null;
  error: string | null;
}

const initialState: InitialStateType = {
  status: Status.IDEAL,
  employee: null,
  error: null,
};

const reducer = (state = initialState, { type, payload }: EmployeeActions) =>
  produce(state, (draft) => {
    switch (type) {
      case ActionTypes.DELETE_EMPLOYEE_REQUEST:
        draft.status = Status.LOADING;
        break;
      case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
        draft.status = Status.SUCCESS;
        draft.employee = payload;
        draft.error = null;
        break;
      case ActionTypes.DELETE_EMPLOYEE_FAILURE:
        draft.status = Status.FAILURE;
        draft.error = payload.error;
        break;
      case ActionTypes.DELETE_EMPLOYEE_RESET:
        draft.status = Status.IDEAL;
        break;
      default:
        break;
    }
  });

export default reducer;
