import filters from "constants/filters";
import groups from "constants/groups";
import sensitivities from "constants/sensitivities";
import _ from "lodash";
import moment from "moment";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { filter as filterItems } from "utils/utils";
import { BUSY_GLOBAL } from "../busy/action";
import { ActionTypes } from "../util";
import {
  editConfigBusy,
  editConfigError,
  editConfigSuccess,
  EDIT_CONFIG,
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
  selectCurrentConfig,
  selectDataForm,
  selectDiagnostics,
  selectTransmogrifyConfigRequest,
  setCurrentConfig,
  transmogrifyConfig,
  transmogrifyConfigBusy,
  transmogrifyConfigError,
  transmogrifyConfigSuccess,
  TRANSMOGRIFY_CONFIG,
  uploadConfigBusy,
  uploadConfigError,
  uploadConfigSuccess,
  uploadSampleBusy,
  uploadSampleError,
  uploadSampleSuccess,
  UPLOAD_CONFIG,
  UPLOAD_SAMPLE,
} from "./action";
import {
  readDetailed,
  readDiagnostics,
  readSources,
  uploadConfig,
  uploadSample,
} from "./api";
const { REQUEST } = ActionTypes;

const transmogrifyConfigHelper = (config, filter, field, direction) => {
  if (!Array.isArray(config && config.items)) {
    return config;
  }
  let items = config.items.slice();
  if (field && direction) {
    let comparator;
    switch (direction) {
      case "asc":
        switch (field) {
          case "COLUMN_INDEX":
            comparator = (a, b) => parseInt(a[field]) - parseInt(b[field]);
            break;
          default:
            comparator = (a, b) => a[field].localeCompare(b[field]);
        }
        break;
      default:
        switch (field) {
          case "COLUMN_INDEX":
            comparator = (a, b) => parseInt(b[field]) - parseInt(a[field]);
            break;
          default:
            comparator = (a, b) => b[field].localeCompare(a[field]);
        }
        break;
    }
    items = items.sort(comparator);
  }
  return {
    items: filterItems(items, filter, [
      "FIELD_NAME",
      "DEID_METHOD",
      "NORMALIZE",
    ]),
  };
};

export function* transmogrifyConfigSaga(action) {
  const { payload } = action;
  const { filter, field, direction } = payload ? payload : {};
  try {
    yield put(transmogrifyConfigBusy(true));
    yield put(transmogrifyConfigError());
    const config = yield select(selectCurrentConfig);
    const response = yield call(
      transmogrifyConfigHelper,
      config,
      filter,
      field,
      direction
    );
    yield put(transmogrifyConfigSuccess(response));
  } catch (error) {
    yield put(transmogrifyConfigError(error.message));
  } finally {
    yield put(transmogrifyConfigBusy(false));
  }
}

const editConfigHelper = (current, config) => {
  return _.merge(current, config);
};

export function* editConfigSaga(action) {
  const { payload } = action;
  try {
    yield put(editConfigBusy(BUSY_GLOBAL));
    yield put(editConfigError());
    const current = yield select(selectCurrentConfig);
    const response = yield call(editConfigHelper, current, payload);
    yield put(editConfigSuccess(true));
    yield put(setCurrentConfig(response));
    const request = yield select(selectTransmogrifyConfigRequest);
    if (request) {
      yield call(transmogrifyConfigSaga, transmogrifyConfig(request));
    }
  } catch (error) {
    yield put(editConfigError(error.message));
  } finally {
    yield put(editConfigBusy(false));
  }
}

const buildConfigHelper = (sample) => {
  if (!sample) {
    return sample;
  }
  const config = {
    items: sample.header.map((h, i) => ({
      DEID_METHOD: "PASSTHROUGH",
      COLUMN_INDEX: `${i}`,
      FIELD_NAME: `${h}`,
      INPUT_REGEX: "",
      GROUP_INDEX: "",
      OUTPUT_FORMAT: "",
      VALIDATE_REGEX: "",
      FILTER_REGEX: "",
      NORMALIZE: "",
      QUERY: "",
      sample: sample.data[h],
      samples: sample.rows.map((row) => row[i]),
    })),
  };
  return config;
};

export function* uploadSampleSaga(action) {
  const { payload } = action;
  try {
    yield put(uploadSampleBusy(BUSY_GLOBAL));
    yield put(uploadSampleError());
    const response = yield call(uploadSample, payload);
    yield put(uploadSampleSuccess(response));
    const config = yield call(buildConfigHelper, response);
    yield put(setCurrentConfig(config));
    const request = yield select(selectTransmogrifyConfigRequest);
    if (request) {
      yield call(transmogrifyConfigSaga, transmogrifyConfig(request));
    }
  } catch (error) {
    yield put(uploadSampleError(error.message));
  } finally {
    yield put(uploadSampleBusy(false));
  }
}

const updateConfigHelper = (current, update) => {
  if (!update) {
    return current;
  }
  const config = {
    items: _.get(current, "items", _.get(update, "items", [])),
  };
  const map = _.get(update, "items", []).reduce(
    (p, c) => _.merge(p, { [c.FIELD_NAME]: c }),
    {}
  );
  config.items = config.items.map((item) =>
    _.merge(item, map[item.FIELD_NAME])
  );
  return config;
};

export function* uploadConfigSaga(action) {
  const { payload } = action;
  try {
    yield put(uploadConfigBusy(BUSY_GLOBAL));
    yield put(uploadConfigError());
    const response = yield call(uploadConfig, payload);
    yield put(uploadConfigSuccess(response));
    const current = yield select(selectCurrentConfig);
    const config = yield call(updateConfigHelper, current, response);
    yield put(setCurrentConfig(config));
    const request = yield select(selectTransmogrifyConfigRequest);
    if (request) {
      yield call(transmogrifyConfigSaga, transmogrifyConfig(request));
    }
  } catch (error) {
    yield put(uploadConfigError(error.message));
  } finally {
    yield put(uploadConfigBusy(false));
  }
}

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
  }
  return result;
};

export function* readDiagnosticsSaga(action) {
  const { payload } = action;
  try {
    yield put(fetchDiagnosticsBusy(true));
    yield put(fetchDiagnosticsError());
    const form = yield select(selectDataForm);
    const temp = _.merge(
      _.omit(form, ["topic"]),
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
    const form = yield select(selectDataForm);
    const temp = _.merge(
      _.omit(form, ["topic"]),
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
            // ...sensitivities.values.reduce(
            //   (a, v) =>
            //     (a[v.name] = filters.values.reduce(
            //       (a, v) => (a[v.name] = {}),
            //       {}
            //     )),
            //   {}
            // ),
          },
        }),
      {}
    );
    data[diagnostic] = temp;
    const end = moment(_.get(form, "end", new Date()));
    Object.values(temp).forEach((value) => {
      const { group } = value;
      const start = end.clone().subtract(group.range);
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
  yield takeLatest(TRANSMOGRIFY_CONFIG[REQUEST], transmogrifyConfigSaga);
  yield takeLatest(EDIT_CONFIG[REQUEST], editConfigSaga);
  yield takeLatest(UPLOAD_SAMPLE[REQUEST], uploadSampleSaga);
  yield takeLatest(UPLOAD_CONFIG[REQUEST], uploadConfigSaga);
  yield takeLatest(FETCH_SOURCES[REQUEST], readSourcesSaga);
  yield takeLatest(FETCH_DIAGNOSTICS[REQUEST], readDiagnosticsSaga);
  yield takeLatest(FETCH_DETAILED[REQUEST], readDetailedSaga);
  yield takeLatest(FETCH_AGGREGATED[REQUEST], readAggregatedSaga);
}
