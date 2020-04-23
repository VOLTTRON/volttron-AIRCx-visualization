import { fromJS } from "immutable";
import moment from "moment";
import { getTimestamp, isActionType, isResetType } from "../util";
import { CURRENT_CONFIG, DATA_FORM, key } from "./action";

const initialState = (function() {
  const end = moment(getTimestamp().getTime()).startOf("day");
  const start = moment(end).year(moment(end).year() - 1);
  return {
    data: {
      form: {
        site: "",
        building: "",
        device: "",
        diagnostic: "",
        start: start.format(),
        end: end.format(),
        filter: "all",
      },
    },
  };
})();

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
    case DATA_FORM:
      return state.setIn(type.split("/"), fromJS(payload));
    default:
      return state;
  }
};

export default reducer;
