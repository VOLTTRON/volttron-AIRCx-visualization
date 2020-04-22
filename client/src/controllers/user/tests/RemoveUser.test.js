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
} from "controllers/user/action";
import {
  SERVICE_ENDPOINT,
  SERVICE_ENDPOINT_REMOVE_USER,
} from "controllers/user/api";
import mock from "controllers/user/mock";
import { removeUserSaga } from "controllers/user/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_REMOVE_USER];

const reduxStore = configureStore({});

describe("user.removeUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("remove action should be dispatched.", () => {
    reduxStore.dispatch(removeUser());
    expect(selectRemoveUserRequest(reduxStore.getState())).toEqual();
  });

  it("remove user saga should complete normally.", () => {
    const { result } = data;
    fetchMock.delete(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 200);
    return expectSaga(removeUserSaga, removeUser())
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
    fetchMock.delete(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 401);
    return expectSaga(removeUserSaga, removeUser())
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
