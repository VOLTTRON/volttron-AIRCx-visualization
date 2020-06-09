import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import {
  fetchDetailed,
  fetchDetailedBusy,
  fetchDetailedError,
  fetchDetailedSuccess,
  selectDetailedRequest,
  setDataForm,
} from "controllers/data/action";
import { SERVICE_ENDPOINT_DETAILED } from "controllers/data/api";
import mock from "controllers/data/mock";
import { readDetailedSaga, transformDetailed } from "controllers/data/saga";
import configureStore from "controllers/store";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_DETAILED];

const reduxStore = configureStore({});

describe("detailed.fetchDetailed()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(setDataForm(payload));
    reduxStore.dispatch(fetchDetailed());
    expect(selectDetailedRequest(reduxStore.getState())).toEqual();
  });

  it("read detailed saga should complete normally.", () => {
    const { payload, result } = data;
    reduxStore.dispatch(setDataForm(payload));
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT_DETAILED}`, result);
    return expectSaga(readDetailedSaga, fetchDetailed())
      .withState(reduxStore.getState())
      .put(fetchDetailedBusy(true))
      .put(fetchDetailedError())
      .put(fetchDetailedSuccess(transformDetailed(result)))
      .put(fetchDetailedBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("read detailed saga should produce error.", () => {
    const { payload } = data;
    reduxStore.dispatch(setDataForm(payload));
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT_DETAILED}`, 401);
    return expectSaga(readDetailedSaga, fetchDetailed())
      .withState(reduxStore.getState())
      .put(fetchDetailedBusy(true))
      .put(fetchDetailedError())
      .put(fetchDetailedError("Unauthorized"))
      .put(fetchDetailedBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
