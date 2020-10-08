import { call, put, takeLatest } from "redux-saga/effects";
import { logError } from "utils/utils";
import { BUSY_GLOBAL } from "../busy/action";
import { ActionTypes } from "../util";
import {
  createUserBusy,
  createUserError,
  createUserSuccess,
  CREATE_USER,
  fetchUserBusy,
  fetchUserError,
  fetchUsersBusy,
  fetchUsersError,
  fetchUsersSuccess,
  fetchUserSuccess,
  FETCH_USER,
  FETCH_USERS,
  removeUserBusy,
  removeUserError,
  removeUserSuccess,
  REMOVE_USER,
  updateUserBusy,
  updateUserError,
  updateUserSuccess,
  UPDATE_USER,
} from "./action";
import { createUser, readUser, readUsers, removeUser, updateUser } from "./api";
const { REQUEST } = ActionTypes;

export function* createUserSaga(action) {
  const { email, password, organization } = action.payload;
  try {
    yield put(createUserBusy(BUSY_GLOBAL));
    yield put(createUserError());
    const response = yield call(createUser, email, password, organization);
    yield put(createUserSuccess(response));
  } catch (error) {
    logError(error);
    yield put(createUserError(error.message));
  } finally {
    yield put(createUserBusy(false));
  }
}

export function* readUserSaga(action) {
  const { id } = action.payload;
  try {
    yield put(fetchUserBusy(true));
    yield put(fetchUserError());
    const response = yield call(readUser, id);
    yield put(fetchUserSuccess(response));
  } catch (error) {
    logError(error);
    yield put(fetchUserError(error.message));
  } finally {
    yield put(fetchUserBusy(false));
  }
}

export function* removeUserSaga(action) {
  const { id } = action.payload;
  try {
    yield put(removeUserBusy(BUSY_GLOBAL));
    yield put(removeUserError());
    yield call(removeUser, id);
    yield put(removeUserSuccess(true));
  } catch (error) {
    logError(error);
    yield put(removeUserError(error.message));
  } finally {
    yield put(removeUserBusy(false));
  }
}

export function* updateUserSaga(action) {
  const { id, email, password, organization, scope } = action.payload;
  try {
    yield put(updateUserBusy(BUSY_GLOBAL));
    yield put(updateUserError());
    const response = yield call(
      updateUser,
      id,
      email,
      password,
      organization,
      scope
    );
    yield put(updateUserSuccess(response));
  } catch (error) {
    logError(error);
    yield put(updateUserError(error.message));
  } finally {
    yield put(updateUserBusy(false));
  }
}

export function* readUsersSaga() {
  try {
    yield put(fetchUsersBusy(true));
    yield put(fetchUsersError());
    const response = yield call(readUsers);
    yield put(fetchUsersSuccess(response));
  } catch (error) {
    logError(error);
    yield put(fetchUsersError(error.message));
  } finally {
    yield put(fetchUsersBusy(false));
  }
}

export default function* usersSaga() {
  yield takeLatest(CREATE_USER[REQUEST], createUserSaga);
  yield takeLatest(FETCH_USERS[REQUEST], readUsersSaga);
  yield takeLatest(FETCH_USER[REQUEST], readUserSaga);
  yield takeLatest(REMOVE_USER[REQUEST], removeUserSaga);
  yield takeLatest(UPDATE_USER[REQUEST], updateUserSaga);
}
