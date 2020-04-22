import { combineReducers } from "redux-immutable";
import { key as busyKey } from "./busy/action";
import busyReducer from "./busy/reducer";
import { key as commonKey } from "./common/action";
import commonReducer from "./common/reducer";
import { key as dataKey } from "./data/action";
import dataReducer from "./data/reducer";
import { key as errorKey } from "./error/action";
import errorReducer from "./error/reducer";
import { key as pollKey } from "./poll/action";
import pollReducer from "./poll/reducer";
import { key as userKey } from "./user/action";
import userReducer from "./user/reducer";
import { key as usersKey } from "./users/action";
import usersReducer from "./users/reducer";

export default combineReducers({
  [userKey]: userReducer,
  [usersKey]: usersReducer,
  [busyKey]: busyReducer,
  [errorKey]: errorReducer,
  [pollKey]: pollReducer,
  [commonKey]: commonReducer,
  [dataKey]: dataReducer,
});
