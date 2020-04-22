import { reset } from "controllers/action";
import { isPollSaga } from "controllers/poll/saga";
import configureStore from "controllers/store";
import { fetchUser, fetchUserPoll } from "controllers/user/action";
import { fetchMock } from "fetch-mock";
import { expectSaga } from "redux-saga-test-plan";

const reduxStore = configureStore({});

describe("poll", () => {
  beforeEach(() => {
    fetchMock.reset();
    reduxStore.dispatch(reset());
  });

  it("poll saga should complete normally.", () => {
    const payload = 200;
    reduxStore.dispatch(fetchUser());
    return expectSaga(isPollSaga, fetchUserPoll(payload))
      .withState(reduxStore.getState())
      .put(fetchUser())
      .silentRun()
      .then(() => {
        expect(fetchMock.done()).toBeTruthy();
      });
  });
});
