import { fromJS } from "immutable";
import { isActionType, isResetType } from "../util";
import { CURRENT_CONFIG, key } from "./action";

const initialState = {};

const reducer = (state = fromJS(initialState), action) => {
  const { type, payload } = action;
  if (isActionType(key, type)) {
    return state.setIn(type.split("/"), fromJS(payload));
  }
  if (isResetType(key, type)) {
    return fromJS(initialState);
  }
  switch (type) {
    case CURRENT_CONFIG:
      return state.setIn(type.split("/"), fromJS(payload));
    default:
      return state;
  }
};

export default reducer;
