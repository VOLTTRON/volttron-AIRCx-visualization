import { fromJS } from "immutable";
import { isActionType } from "../util";
import { key, MODE, NOTICE, RESET } from "./action";

const initialState = {};

const reducer = (state = fromJS(initialState), action) => {
  const { type, payload } = action;
  if (isActionType(key, type)) {
    return state.setIn(type.split("/"), fromJS(payload));
  }
  // do not clear on global reset
  // if (isResetType(key, type)) {
  //   return fromJS(initialState);
  // }
  switch (type) {
    case RESET:
      return fromJS(initialState);
    case MODE:
    case NOTICE:
      return state.setIn(type.split("/"), fromJS(payload));
    default:
      return state;
  }
};

export default reducer;
