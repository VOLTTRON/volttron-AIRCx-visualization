import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import {
  fetchDiagnostics,
  fetchDiagnosticsBusy,
  fetchDiagnosticsError,
  fetchDiagnosticsSuccess,
  selectDiagnosticsRequest,
  setDataForm,
} from "controllers/data/action";
import { SERVICE_ENDPOINT_DIAGNOSTICS } from "controllers/data/api";
import mock from "controllers/data/mock";
import {
  readDiagnosticsSaga,
  transformDiagnostics,
} from "controllers/data/saga";
import configureStore from "controllers/store";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_DIAGNOSTICS];

const reduxStore = configureStore({});

describe("diagnostics.fetchDiagnostics()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(setDataForm(payload));
    reduxStore.dispatch(fetchDiagnostics());
    expect(selectDiagnosticsRequest(reduxStore.getState())).toEqual();
  });

  it("read diagnostics saga should complete normally.", () => {
    const { payload, result } = data;
    reduxStore.dispatch(setDataForm(payload));
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT_DIAGNOSTICS}`, result);
    return expectSaga(readDiagnosticsSaga, fetchDiagnostics())
      .withState(reduxStore.getState())
      .put(fetchDiagnosticsBusy(true))
      .put(fetchDiagnosticsError())
      .put(fetchDiagnosticsSuccess(transformDiagnostics(result)))
      .put(fetchDiagnosticsBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("read diagnostics saga should produce error.", () => {
    const { payload } = data;
    reduxStore.dispatch(setDataForm(payload));
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT_DIAGNOSTICS}`, 401);
    return expectSaga(readDiagnosticsSaga, fetchDiagnostics())
      .withState(reduxStore.getState())
      .put(fetchDiagnosticsBusy(true))
      .put(fetchDiagnosticsError())
      .put(fetchDiagnosticsError("Unauthorized"))
      .put(fetchDiagnosticsBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
