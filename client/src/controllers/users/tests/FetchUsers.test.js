import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import configureStore from "controllers/store";
import {
  fetchUsers,
  fetchUsersBusy,
  fetchUsersError,
  fetchUsersSuccess,
  selectUsersRequest,
} from "controllers/users/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_READ_USERS,
} from "controllers/users/api";
import mock from "controllers/users/mock";
import { readUsersSaga } from "controllers/users/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_READ_USERS];

const reduxStore = configureStore({});

describe("users.fetchUsers()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("fetch action should be dispatched.", () => {
    reduxStore.dispatch(fetchUsers());
    expect(selectUsersRequest(reduxStore.getState())).toEqual();
  });

  it("read users saga should complete normally.", () => {
    const { result } = data;
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, result);
    return expectSaga(readUsersSaga, fetchUsers())
      .put(fetchUsersBusy(true))
      .put(fetchUsersError())
      .put(fetchUsersSuccess(result))
      .put(fetchUsersBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("read users saga should produce error.", () => {
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 401);
    return expectSaga(readUsersSaga, fetchUsers())
      .put(fetchUsersBusy(true))
      .put(fetchUsersError())
      .put(fetchUsersError("Unauthorized"))
      .put(fetchUsersBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
