import _ from "lodash";
import { call, put, takeLatest } from "redux-saga/effects";
import { logError } from "utils/utils";
import { reset } from "../action";
import { getAuthorization, setAuthorization } from "../api";
import { BUSY_GLOBAL } from "../busy/action";
import { ActionTypes } from "../util";
import {
  continueUserBusy,
  continueUserError,
  continueUserSuccess,
  CONTINUE_USER,
  fetchUserBusy,
  fetchUserError,
  fetchUserSuccess,
  FETCH_USER,
  loginUserBusy,
  loginUserError,
  loginUserSuccess,
  LOGIN_USER,
  logoutUserBusy,
  logoutUserError,
  logoutUserSuccess,
  LOGOUT_USER,
  removeUserBusy,
  removeUserError,
  removeUserSuccess,
  REMOVE_USER,
  updateUserBusy,
  updateUserError,
  updateUserSuccess,
  UPDATE_USER,
} from "./action";
import { login, readUser, removeUser, updateUser } from "./api";
const { REQUEST } = ActionTypes;

const defaultPreferences = (user) => {
  // TODO declare default preferences in second object
  user.preferences = _.merge({}, {}, user.preferences);
  return user;
};

export function* readUserSaga() {
  try {
    yield put(fetchUserBusy(true));
    yield put(fetchUserError());
    let response = yield call(readUser);
    response = yield call(defaultPreferences, response);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    logError(error);
    yield put(fetchUserError(error.message));
  } finally {
    yield put(fetchUserBusy(false));
  }
}

export function* removeUserSaga() {
  try {
    yield put(removeUserBusy(BUSY_GLOBAL));
    yield put(removeUserError());
    yield call(removeUser);
    yield put(removeUserSuccess(true));
  } catch (error) {
    logError(error);
    yield put(removeUserError(error.message));
  } finally {
    yield put(removeUserBusy(false));
  }
}

export function* updateUserSaga(action) {
  const { email, password, preferences } = action.payload;
  try {
    yield put(updateUserBusy(BUSY_GLOBAL));
    yield put(updateUserError());
    const response = yield call(updateUser, email, password, preferences);
    yield put(updateUserSuccess(response));
  } catch (error) {
    logError(error);
    yield put(updateUserError(error.message));
  } finally {
    yield put(updateUserBusy(false));
  }
}

export function* loginSaga(action) {
  const { email, password } = action.payload;
  try {
    yield put(loginUserBusy(BUSY_GLOBAL));
    yield put(loginUserError());
    const response = yield call(login, email, password);
    yield call(setAuthorization, response && response.token);
    yield put(loginUserSuccess(response && response.token));
    yield call(readUserSaga);
  } catch (error) {
    logError(error);
    yield call(setAuthorization, null);
    yield put(loginUserError(error.message));
  } finally {
    yield put(loginUserBusy(false));
  }
}

export function* logoutSaga() {
  try {
    yield put(logoutUserBusy(BUSY_GLOBAL));
    yield put(logoutUserError());
    yield call(setAuthorization, null);
    yield put(reset());
    yield put(logoutUserSuccess(true));
  } catch (error) {
    logError(error);
    yield put(logoutUserError(error.message));
  } finally {
    yield put(logoutUserBusy(false));
  }
}

export function* continueSaga() {
  try {
    yield put(continueUserBusy(BUSY_GLOBAL));
    yield put(continueUserError());
    const auth = yield call(getAuthorization);
    if (auth && auth !== "invalid") {
      yield put(loginUserSuccess(auth));
      yield put(continueUserSuccess(auth));
      yield call(readUserSaga);
    } else {
      yield call(setAuthorization, null);
    }
  } catch (error) {
    logError(error);
    yield call(setAuthorization, null);
    yield put(continueUserError(error.message));
  } finally {
    yield put(continueUserBusy(false));
  }
}

export default function* usersSaga() {
  yield takeLatest(CONTINUE_USER[REQUEST], continueSaga);
  yield takeLatest(FETCH_USER[REQUEST], readUserSaga);
  yield takeLatest(REMOVE_USER[REQUEST], removeUserSaga);
  yield takeLatest(UPDATE_USER[REQUEST], updateUserSaga);
  yield takeLatest(LOGIN_USER[REQUEST], loginSaga);
  yield takeLatest(LOGOUT_USER[REQUEST], logoutSaga);
}
