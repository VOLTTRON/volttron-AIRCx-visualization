import { reset } from "controllers/action";
import { SERVICE_URL } from "controllers/api";
import { BUSY_GLOBAL } from "controllers/busy/action";
import configureStore from "controllers/store";
import {
  loginUser,
  loginUserBusy,
  loginUserError,
  loginUserSuccess,
  selectLoginUserRequest,
} from "controllers/user/action";
import { SERVICE_ENDPOINT, SERVICE_ENDPOINT_LOGIN } from "controllers/user/api";
import mock from "controllers/user/mock";
import { loginSaga } from "controllers/user/saga";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[SERVICE_ENDPOINT_LOGIN];

const reduxStore = configureStore({});

describe("user.loginUser()", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("login action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(loginUser(payload));
    expect(selectLoginUserRequest(reduxStore.getState())).toEqual(payload);
  });

  it("login saga should complete normally.", () => {
    const { payload, result } = data;
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT}/login`, {
      token: result,
    });
    fetchMock.get(`${SERVICE_URL}/${SERVICE_ENDPOINT}`, 200);
    return expectSaga(loginSaga, loginUser(payload))
      .put(loginUserBusy(BUSY_GLOBAL))
      .put(loginUserError())
      .put(loginUserSuccess(result))
      .put(loginUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });

  it("login saga should produce error.", () => {
    const { payload } = data;
    fetchMock.post(`${SERVICE_URL}/${SERVICE_ENDPOINT}/login`, 401);
    return expectSaga(loginSaga, loginUser(payload))
      .put(loginUserBusy(BUSY_GLOBAL))
      .put(loginUserError())
      .put(loginUserError("Unauthorized"))
      .put(loginUserBusy(false))
      .run()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
