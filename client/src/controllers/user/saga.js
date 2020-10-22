// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

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
