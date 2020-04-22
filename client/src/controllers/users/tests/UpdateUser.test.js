import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import { BUSY_GLOBAL } from "controllers/busy/action";
import configureStore from "controllers/store";
import {
  selectUpdateUserRequest,
  updateUser,
  updateUserBusy,
  updateUserError,
  updateUserSuccess,
} from "controllers/users/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_UPDATE_USER,
} from "controllers/users/api";
import mock from "controllers/users/mock";
import { updateUserSaga } from "controllers/users/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_UPDATE_USER];

const reduxStore = configureStore({});

describe("users.updateUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("update action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(updateUser(payload));
    expect(selectUpdateUserRequest(reduxStore.getState())).toEqual(payload);
  });

  it("update user saga should complete normally.", () => {
    const { payload, result } = data;
    fetchMock.put(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, result);
    return expectSaga(updateUserSaga, updateUser(payload))
      .put(updateUserBusy(BUSY_GLOBAL))
      .put(updateUserError())
      .put(updateUserSuccess(result))
      .put(updateUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("update user saga should produce error.", () => {
    const { payload } = data;
    fetchMock.put(`${SERVICE_URL}/${SERVICE_ENDPOINT}/${payload.id}`, 401);
    return expectSaga(updateUserSaga, updateUser(payload))
      .put(updateUserBusy(BUSY_GLOBAL))
      .put(updateUserError())
      .put(updateUserError("Unauthorized"))
      .put(updateUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
