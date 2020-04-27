import _ from "lodash";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { filter as filterItems } from "utils/utils";
import { BUSY_GLOBAL } from "../busy/action";
import { ActionTypes } from "../util";
import {
  editConfigBusy,
  editConfigError,
  editConfigSuccess,
  EDIT_CONFIG,
  fetchDiagnosticsBusy,
  fetchDiagnosticsError,
  fetchDiagnosticsSuccess,
  fetchSourcesBusy,
  fetchSourcesError,
  fetchSourcesSuccess,
  FETCH_DIAGNOSTICS,
  FETCH_SOURCES,
  selectCurrentConfig,
  selectDataForm,
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

export function* readDiagnosticsSaga(action) {
  const { payload } = action;
  try {
    yield put(fetchDiagnosticsBusy(true));
    yield put(fetchDiagnosticsError());
    const form = yield select(selectDataForm);
    const response = yield call(readDiagnostics, _.merge(form, payload));
    yield put(fetchDiagnosticsSuccess(response));
  } catch (error) {
    yield put(fetchDiagnosticsError(error.message));
  } finally {
    yield put(fetchDiagnosticsBusy(false));
  }
}

export default function* dataSaga() {
  yield takeLatest(TRANSMOGRIFY_CONFIG[REQUEST], transmogrifyConfigSaga);
  yield takeLatest(EDIT_CONFIG[REQUEST], editConfigSaga);
  yield takeLatest(UPLOAD_SAMPLE[REQUEST], uploadSampleSaga);
  yield takeLatest(UPLOAD_CONFIG[REQUEST], uploadConfigSaga);
  yield takeLatest(FETCH_SOURCES[REQUEST], readSourcesSaga);
  yield takeLatest(FETCH_DIAGNOSTICS[REQUEST], readDiagnosticsSaga);
}
