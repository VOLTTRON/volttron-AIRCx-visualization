import filters from "constants/filters";
import groups from "constants/groups";
import sensitivities from "constants/sensitivities";
import _ from "lodash";
import moment from "moment";
import { call, put, select, takeLatest } from "redux-saga/effects";
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
  selectDiagnostics,
} from "./action";
import { readDetailed, readDiagnostics, readSources } from "./api";
const { REQUEST } = ActionTypes;

export function* readSourcesSaga() {
  try {
    yield put(fetchSourcesBusy(true));
    yield put(fetchSourcesError());
    const response = yield call(readSources);
    yield put(fetchSourcesSuccess(response));
  } catch (error) {
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
    const fault = filters.parse("fault");
    const okay = filters.parse("okay");
    Object.keys(result).forEach((d) =>
      Object.keys(result[d]).forEach((y) =>
        Object.keys(result[d][y]).forEach((m) =>
          Object.keys(result[d][y][m]).forEach((t) => {
            const values = _.concat(...Object.values(result[d][y][m][t]));
            const aggregate = ["low", "normal", "high"].reduce(
              (c, k) =>
                _.merge(c, {
                  [k]: filters.aggregate(
                    values.map((v) => v[k]).filter((v) => fault.isType(v)),
                    values.map((v) => v[k]).filter((v) => okay.isType(v))
                  ),
                }),
              {}
            );
            // TODO store the aggregate values somewhere
            // _.merge(result[d][y][m][t], { aggregate: aggregate });
          })
        )
      )
    );
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
    yield call(readAggregatedSaga);
  } catch (error) {
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
        topic: _.get(payload, ["topic", "0", "detailed"], []),
      },
      _.omit(payload, ["topic"])
    );
    const response = yield call(readDetailed, temp);
    yield put(fetchDetailedSuccess(response));
  } catch (error) {
    yield put(fetchDetailedError(error.message));
  } finally {
    yield put(fetchDetailedBusy(false));
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
    yield put(fetchAggregatedError(error.message));
  } finally {
    yield put(fetchAggregatedBusy(false));
  }
}

export default function* dataSaga() {
  yield takeLatest(FETCH_SOURCES[REQUEST], readSourcesSaga);
  yield takeLatest(FETCH_DIAGNOSTICS[REQUEST], readDiagnosticsSaga);
  yield takeLatest(FETCH_DETAILED[REQUEST], readDetailedSaga);
  yield takeLatest(FETCH_AGGREGATED[REQUEST], readAggregatedSaga);
}
