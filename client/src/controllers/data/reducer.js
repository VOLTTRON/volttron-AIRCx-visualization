import { fromJS } from "immutable";
import moment from "moment";
import { getTimestamp, isActionType, isResetType } from "../util";
import { DATA_FORM, key } from "./action";

const initialState = (function() {
  const end = moment(getTimestamp().getTime()).endOf("day");
  const start = moment(end)
    .subtract(1, "year")
    .startOf("day");
  return {
    data: {
      form: {
        site: "",
        building: "",
        device: "",
        diagnostic: "",
        start: start.format(),
        end: end.format(),
        group: "day",
        filter: "all",
        sensitivity: "normal",
        date: end.format(),
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
    case DATA_FORM:
      return state.setIn(type.split("/"), fromJS(payload));
    default:
      return state;
  }
};

export default reducer;
