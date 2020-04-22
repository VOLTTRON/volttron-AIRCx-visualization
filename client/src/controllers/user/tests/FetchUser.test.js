import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import configureStore from "controllers/store";
import {
  fetchUser,
  fetchUserBusy,
  fetchUserError,
  fetchUserSuccess,
  selectUserRequest,
} from "controllers/user/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_READ_USER,
} from "controllers/user/api";
import mock from "controllers/user/mock";
import { readUserSaga } from "controllers/user/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_READ_USER];

const reduxStore = configureStore({});

describe("user.fetchUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    reduxStore.dispatch(fetchUser());
    expect(selectUserRequest(reduxStore.getState())).toEqual();
  });

  it("read user saga should complete normally.", () => {
    const { result } = data;
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, result);
    return expectSaga(readUserSaga, fetchUser())
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
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 401);
    return expectSaga(readUserSaga, fetchUser())
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
