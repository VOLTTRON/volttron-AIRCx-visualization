import { reset } from "controllers/action";
import { selectCurrentConfig, setCurrentConfig } from "controllers/data/action";
import configureStore from "controllers/store";

const reduxStore = configureStore({});

describe("data.setCurrentConfig()", () => {
  beforeEach(() => {
    reduxStore.dispatch(reset());
  });

  it("set current config action should be dispatched.", () => {
    const payload = {
      key: "1234567890",
      data: [],
    };
    reduxStore.dispatch(setCurrentConfig(payload));
    expect(selectCurrentConfig(reduxStore.getState())).toEqual(payload);
  });
});
