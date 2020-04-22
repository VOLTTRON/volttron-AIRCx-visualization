import { all } from "redux-saga/effects";
import busySaga from "./busy/saga";
import commonSaga from "./common/saga";
import dataSaga from "./data/saga";
import errorSaga from "./error/saga";
import pollSaga from "./poll/saga";
import userSaga from "./user/saga";
import usersSaga from "./users/saga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    usersSaga(),
    busySaga(),
    errorSaga(),
    pollSaga(),
    commonSaga(),
    dataSaga(),
  ]);
}
