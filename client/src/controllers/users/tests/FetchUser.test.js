import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import configureStore from "controllers/store";
import {
  fetchUser,
  fetchUserBusy,
  fetchUserError,
  fetchUserSuccess,
  selectUserRequest,
} from "controllers/users/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_READ_USER,
} from "controllers/users/api";
import mock from "controllers/users/mock";
import { readUserSaga } from "controllers/users/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_READ_USER];

const reduxStore = configureStore({});

describe("users.fetchUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(fetchUser(payload));
    expect(selectUserRequest(reduxStore.getState())).toEqual(payload);
  });

  it("read user saga should complete normally.", () => {
    const { payload, result } = data;
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, result);
    return expectSaga(readUserSaga, fetchUser(payload))
      .put(fetchUserBusy(true))
      .put(fetchUserError())
      .put(fetchUserSuccess(result))
      .put(fetchUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("read user saga should produce error.", () => {
    const { payload } = data;
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, 401);
    return expectSaga(readUserSaga, fetchUser(payload))
      .put(fetchUserBusy(true))
      .put(fetchUserError())
      .put(fetchUserError("Unauthorized"))
      .put(fetchUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
