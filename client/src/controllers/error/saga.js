import { select, call, put, takeEvery } from "redux-saga/effects";
import {
  errorTokens,
  selectErrorTokens,
  CLEAR_ERROR,
  clearErrorError,
  clearErrorBusy,
  clearErrorSuccess
} from "./action";
import { reset } from "../action";
import _ from "lodash";
import { ActionTypes, generateAction } from "../util";
const { REQUEST, ERROR } = ActionTypes;

const modifyErrorToken = (action, tokens) => {
  const { type, payload } = action;
  tokens[type] = _.assign({}, tokens[type], payload, {
    cleared: !Boolean(payload)
  });
  return tokens;
};

const isUnauthorized = action => {
  const { payload } = action;
  return /unauthorized|expired|session is invalid/im.test(
    _.get(payload, "error", "")
  );
};

export function* isErrorSaga(action) {
  const tokens = yield select(selectErrorTokens);
  yield call(modifyErrorToken, action, tokens);
  if (isUnauthorized(action)) {
    yield put(reset());
  }
  yield put(errorTokens(tokens));
}

const isErrorAction = action => {
  const types = action.type.split("/");
  return types[types.length - 1] === ERROR;
};

export function* clearErrorSaga(action) {
  const { payload: key } = action;
  if (!key) {
    return;
  }
  const errorAction = generateAction(key);
  try {
    yield put(clearErrorBusy());
    yield put(clearErrorError());
    const tokens = yield select(selectErrorTokens);
    yield call(modifyErrorToken, errorAction(), tokens);
    yield put(clearErrorSuccess("successfully cleared error"));
  } catch (error) {
    yield put(clearErrorError(error.message));
  } finally {
    yield put(clearErrorBusy(false));
  }
}

export default function* errorSaga() {
  yield takeEvery(isErrorAction, isErrorSaga);
  yield takeEvery(CLEAR_ERROR[REQUEST], clearErrorSaga);
}
