import { produce } from "immer";
import { Status } from "../../../utils/constant";
import { CafesActions, ActionTypes, Cafe } from "../types";

interface InitialStateType {
  status: Status;
  cafes: Cafe[];
  error: string | null;
}

const initialState: InitialStateType = {
  status: Status.IDEAL,
  cafes: [],
  error: null,
};

const reducer = (state = initialState, { type, payload }: CafesActions) =>
  produce(state, (draft) => {
    switch (type) {
      case ActionTypes.FETCH_CAFES_REQUEST:
        draft.status = Status.LOADING;
        break;
      case ActionTypes.FETCH_CAFES_SUCCESS:
        draft.status = Status.SUCCESS;
        draft.cafes = payload.cafes;
        draft.error = null;
        break;
      case ActionTypes.DELETE_CAFE_FAILURE:
        draft.status = Status.FAILURE;
        draft.error = payload.error;
        break;
      default:
        break;
    }
  });

export default reducer;
