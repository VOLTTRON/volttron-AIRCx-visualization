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

import filters from "constants/filters";
import groups from "constants/groups";
import sensitivities from "constants/sensitivities";
import _ from "lodash";
import moment from "moment";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { logError } from "utils/utils";
import { ActionTypes } from "../util";
import {
  fetchAggregatedBusy,
  fetchAggregatedError,
  fetchAggregatedSuccess,
  fetchDetailedBusy,
  fetchDetailedError,
  fetchDetailedSuccess,
  fetchDiagnosticsBusy,
  fetchDiagnosticsError,
  fetchDiagnosticsSuccess,
  fetchSourcesBusy,
  fetchSourcesError,
  fetchSourcesSuccess,
  FETCH_AGGREGATED,
  FETCH_DETAILED,
  FETCH_DIAGNOSTICS,
  FETCH_SOURCES,
  selectDataForm,
  selectDetailed,
  selectDetailedRequest,
  selectDiagnostics,
  selectTransmogrifyDetailedRequest,
  transmogrifyDetailed,
  transmogrifyDetailedBusy,
  transmogrifyDetailedError,
  transmogrifyDetailedPerformance,
  transmogrifyDetailedSuccess,
  TRANSMOGRIFY_DETAILED,
} from "./action";
import { readDetailed, readDiagnostics, readSources } from "./api";
import { transmogrifyDetailedUtil } from "./transmogrify";
const { REQUEST } = ActionTypes;

export function* readSourcesSaga() {
  try {
    yield put(fetchSourcesBusy(true));
    yield put(fetchSourcesError());
    const response = yield call(readSources);
    yield put(fetchSourcesSuccess(response));
  } catch (error) {
    logError(error);
    yield put(fetchSourcesError(error.message));
  } finally {
    yield put(fetchSourcesBusy(false));
  }
}

export const transformDiagnostics = (data) => {
  const result = {};
  if (data) {
    Object.keys(data).forEach((k) => {
      data[k].forEach((t) => {
        const date = moment(t[0]);
        const path = [
          k,
          `${date.year()}`,
          `${date.month()}`,
          `${date.date()}`,
          `${date.hour()}`,
        ];
        const values = _.get(result, path, []);
        values.push(_.merge({ timestamp: t[0] }, t[1]));
        _.setWith(result, path, values, Object);
      });
    });
    // this section of code will build aggregate states
    // const fault = filters.parse("fault");
    // const okay = filters.parse("okay");
    // Object.keys(result).forEach((d) =>
    //   Object.keys(result[d]).forEach((y) =>
    //     Object.keys(result[d][y]).forEach((m) =>
    //       Object.keys(result[d][y][m]).forEach((t) => {
    //         const values = _.concat(...Object.values(result[d][y][m][t]));
    //         const aggregate = ["low", "normal", "high"].reduce(
    //           (c, k) =>
    //             _.merge(c, {
    //               [k]: filters.aggregate(
    //                 values.map((v) => v[k]).filter((v) => fault.isType(v)),
    //                 values.map((v) => v[k]).filter((v) => okay.isType(v))
    //               ),
    //             }),
    //           {}
    //         );
    //         // TODO store the aggregate values somewhere
    //         _.merge(result[d][y][m][t], { aggregate: aggregate });
    //       })
    //     )
    //   )
    // );
  }
  return result;
};

export function* readDiagnosticsSaga(action) {
  const { payload } = action;
  try {
    yield put(fetchDiagnosticsBusy(true));
    yield put(fetchDiagnosticsError());
    const temp = _.merge(
      {
        topic: _.get(payload, "topic", []).map((t) => t.diagnostics),
      },
      _.omit(payload, ["topic"])
    );
    const response = yield call(readDiagnostics, temp);
    const result = yield call(transformDiagnostics, response);
    yield put(fetchDiagnosticsSuccess(result));
    // not currently being used
    // yield call(readAggregatedSaga);
  } catch (error) {
    logError(error);
    yield put(fetchDiagnosticsError(error.message));
  } finally {
    yield put(fetchDiagnosticsBusy(false));
  }
}

export function* readDetailedSaga(action) {
  const { payload } = action;
  try {
    yield put(fetchDetailedBusy(true));
    yield put(fetchDetailedError());
    const temp = _.merge(
      {
        topic: _.concat(
          _.get(payload, ["topic", "0", "detailed"], []),
          ...Object.values(_.get(payload, ["topic", "0", "subdevices"], {}))
        ),
      },
      _.omit(payload, ["topic"])
    );
    const response = yield call(readDetailed, temp);
    yield put(fetchDetailedSuccess(response));
    const request = yield select(selectTransmogrifyDetailedRequest);
    yield call(transmogrifyDetailedSaga, transmogrifyDetailed(request));
  } catch (error) {
    logError(error);
    yield put(fetchDetailedError(error.message));
  } finally {
    yield put(fetchDetailedBusy(false));
  }
}

export function* transmogrifyDetailedSaga(action) {
  const { payload } = action;
  const { type, filter, path } = payload;
  try {
    yield put(transmogrifyDetailedBusy(true));
    yield put(transmogrifyDetailedError());
    yield put(transmogrifyDetailedPerformance());
    const start = moment();
    const form = yield select(selectDataForm);
    const diagnostics = yield select(selectDiagnostics);
    const request = yield select(selectDetailedRequest);
    const detailed = yield select(selectDetailed);
    const response = yield call(
      transmogrifyDetailedUtil,
      diagnostics,
      detailed,
      form,
      request,
      type,
      filter,
      path
    );
    yield put(transmogrifyDetailedSuccess(response));
    const end = moment();
    yield put(
      transmogrifyDetailedPerformance({
        start: start.format(),
        end: end.format(),
        duration: `${end.diff(start, "second")} seconds`,
      })
    );
  } catch (error) {
    logError(error);
    yield put(transmogrifyDetailedError(error.message));
  } finally {
    yield put(transmogrifyDetailedBusy(false));
  }
}

export const transformAggregated = (diagnostics, form) => {
  const data = {};
  Object.keys(diagnostics).forEach((diagnostic) => {
    const temp = groups.values.reduce(
      (a, v) =>
        _.merge(a, {
          [v.name]: {
            group: v,
          },
        }),
      {}
    );
    data[diagnostic] = temp;
    const end = moment(_.get(form, "end", new Date()));
    Object.values(temp).forEach((value) => {
      const { group } = value;
      const start = moment.max(
        end.clone().subtract(group.range),
        moment(_.get(form, "start", new Date()))
      );
      const max = Math.ceil(end.diff(start, group.increment));
      _.merge(value, { start: start.format(), end: end.format(), max });
      Object.keys(_.get(diagnostics, diagnostic, {})).forEach((year) =>
        Object.keys(_.get(diagnostics, [diagnostic, year], {})).forEach(
          (month) =>
            Object.keys(
              _.get(diagnostics, [diagnostic, year, month], {})
            ).forEach((day) =>
              Object.keys(
                _.get(diagnostics, [diagnostic, year, month, day], {})
              ).forEach((i) =>
                _.get(
                  diagnostics,
                  [diagnostic, year, month, day, i],
                  []
                ).forEach((v) => {
                  const timestamp = moment(v.timestamp);
                  if (
                    timestamp.isSameOrAfter(start) &&
                    timestamp.isBefore(end)
                  ) {
                    const bin = group.buildBin(v.timestamp);
                    sensitivities.values.forEach((s) => {
                      if (s.isType(v)) {
                        filters.values.forEach((f) => {
                          if (f.isType(v[s.name])) {
                            _.set(
                              value,
                              [s.name, f.name, bin],
                              _.concat(
                                _.get(value, [s.name, f.name, bin], []),
                                [v]
                              )
                            );
                          }
                        });
                      }
                    });
                  }
                })
              )
            )
        )
      );
    });
  });
  return data;
};

export function* readAggregatedSaga() {
  try {
    yield put(fetchAggregatedBusy(true));
    yield put(fetchAggregatedError());
    const form = yield select(selectDataForm);
    const diagnostics = yield select(selectDiagnostics);
    const response = yield call(transformAggregated, diagnostics, form);
    yield put(fetchAggregatedSuccess(response));
  } catch (error) {
    logError(error);
    yield put(fetchAggregatedError(error.message));
  } finally {
    yield put(fetchAggregatedBusy(false));
  }
}

export default function* dataSaga() {
  yield takeLatest(FETCH_SOURCES[REQUEST], readSourcesSaga);
  yield takeLatest(FETCH_DIAGNOSTICS[REQUEST], readDiagnosticsSaga);
  yield takeLatest(FETCH_DETAILED[REQUEST], readDetailedSaga);
  yield takeLatest(TRANSMOGRIFY_DETAILED[REQUEST], transmogrifyDetailedSaga);
  yield takeLatest(FETCH_AGGREGATED[REQUEST], readAggregatedSaga);
}
