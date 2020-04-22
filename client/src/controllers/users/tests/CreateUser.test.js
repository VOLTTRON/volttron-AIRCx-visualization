import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import { BUSY_GLOBAL } from "controllers/busy/action";
import configureStore from "controllers/store";
import {
  createUser,
  createUserBusy,
  createUserError,
  createUserSuccess,
  selectCreateUserRequest,
} from "controllers/users/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_CREATE_USER,
} from "controllers/users/api";
import mock from "controllers/users/mock";
import { createUserSaga } from "controllers/users/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_CREATE_USER];

const reduxStore = configureStore({});

describe("users.createUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("create action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(createUser(payload));
    expect(selectCreateUserRequest(reduxStore.getState())).toEqual(payload);
  });

  it("create user saga should complete normally.", () => {
    const { payload, result } = data;
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, result);
    return expectSaga(createUserSaga, createUser(payload))
      .put(createUserBusy(BUSY_GLOBAL))
      .put(createUserError())
      .put(createUserSuccess(result))
      .put(createUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("create user saga should produce error.", () => {
    const { payload } = data;
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 401);
    return expectSaga(createUserSaga, createUser(payload))
      .put(createUserBusy(BUSY_GLOBAL))
      .put(createUserError())
      .put(createUserError("Unauthorized"))
      .put(createUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
