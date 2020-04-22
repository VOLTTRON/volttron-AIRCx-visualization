import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import { BUSY_GLOBAL } from "controllers/busy/action";
import configureStore from "controllers/store";
import {
  removeUser,
  removeUserBusy,
  removeUserError,
  removeUserSuccess,
  selectRemoveUserRequest,
} from "controllers/users/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_REMOVE_USER,
} from "controllers/users/api";
import mock from "controllers/users/mock";
import { removeUserSaga } from "controllers/users/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_REMOVE_USER];

const reduxStore = configureStore({});

describe("users.removeUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("remove action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(removeUser(payload));
    expect(selectRemoveUserRequest(reduxStore.getState())).toEqual(payload);
  });

  it("remove user saga should complete normally.", () => {
    const { payload, result } = data;
    fetchMock.delete(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, 200);
    return expectSaga(removeUserSaga, removeUser(payload))
      .put(removeUserBusy(BUSY_GLOBAL))
      .put(removeUserError())
      .put(removeUserSuccess(result))
      .put(removeUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("remove user saga should produce error.", () => {
    const { payload } = data;
    fetchMock.delete(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, 401);
    return expectSaga(removeUserSaga, removeUser(payload))
      .put(removeUserBusy(BUSY_GLOBAL))
      .put(removeUserError())
      .put(removeUserError("Unauthorized"))
      .put(removeUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
