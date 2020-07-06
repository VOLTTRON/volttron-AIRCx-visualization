import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import {
  fetchSources,
  fetchSourcesBusy,
  fetchSourcesError,
  fetchSourcesSuccess,
  selectSourcesRequest,
} from "controllers/data/action";
import { SERVICE_ENDPOINT_SOURCES } from "controllers/data/api";
import mock from "controllers/data/mock";
import { readSourcesSaga } from "controllers/data/saga";
import configureStore from "controllers/store";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_SOURCES];

const reduxStore = configureStore({});

describe("sources.fetchSources()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    reduxStore.dispatch(fetchSources());
    expect(selectSourcesRequest(reduxStore.getState())).toEqual();
  });

  it("read sources saga should complete normally.", () => {
    const { result } = data;
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT_SOURCES}`, result);
    return expectSaga(readSourcesSaga, fetchSources())
      .put(fetchSourcesBusy(true))
      .put(fetchSourcesError())
      .put(fetchSourcesSuccess(result))
      .put(fetchSourcesBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("read sources saga should produce error.", () => {
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT_SOURCES}`, 401);
    return expectSaga(readSourcesSaga, fetchSources())
      .put(fetchSourcesBusy(true))
      .put(fetchSourcesError())
      .put(fetchSourcesError("Unauthorized"))
      .put(fetchSourcesBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
