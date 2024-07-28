import { produce } from "immer";

import { Status } from "../../../utils/constant";
import { CafesActions, ActionTypes, Cafe } from "../types";

export interface InitialStateType {
  status: Status;
  cafe: Cafe | null;
  error: string | null;
}

const initialState: InitialStateType = {
  status: Status.IDEAL,
  cafe: null,
  error: null,
};

const reducer = (state = initialState, { type, payload }: CafesActions) =>
  produce(state, (draft) => {
    switch (type) {
      case ActionTypes.ADD_CAFE_REQUEST:
        draft.status = Status.LOADING;
        break;
      case ActionTypes.ADD_CAFE_SUCCESS:
        draft.status = Status.SUCCESS;
        draft.cafe = payload;
        break;

      case ActionTypes.ADD_CAFE_FAILURE:
        draft.status = Status.FAILURE;
        draft.error = payload.error;
        break;
      case ActionTypes.ADD_RESET:
        draft.status = Status.IDEAL;
        break;
      default:
        break;
    }
  });

export default reducer;
