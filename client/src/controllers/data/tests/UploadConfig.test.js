import { reset } from "controllers/action";
import { BUSY_GLOBAL } from "controllers/busy/action";
import {
  selectConfigRequest,
  uploadConfig,
  uploadConfigBusy,
  uploadConfigError,
  uploadConfigSuccess,
} from "controllers/data/action";
import { UNIQUE_KEY_UPLOAD_CONFIG } from "controllers/data/api";
import mock from "controllers/data/mock";
import { uploadConfigSaga } from "controllers/data/saga";
import configureStore from "controllers/store";
import _ from "lodash";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[UNIQUE_KEY_UPLOAD_CONFIG];

const reduxStore = configureStore({});

describe("data.uploadConfig()", () => {
  beforeEach(() => {
    reduxStore.dispatch(reset());
  });

  it("upload action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(uploadConfig(payload));
    expect(selectConfigRequest(reduxStore.getState())).toEqual(payload);
  });

  it("read config saga should complete normally.", () => {
    const { payload, result } = data;
    return expectSaga(uploadConfigSaga, uploadConfig(payload))
      .put(uploadConfigBusy(BUSY_GLOBAL))
      .put(uploadConfigError())
      .put(uploadConfigSuccess(result))
      .put(uploadConfigBusy(false))
      .run();
  });

  it("read config saga should produce error.", () => {
    const payload = _.merge(new Blob(["{{{{"], { type: "application/json" }), {
      lastModifiedDate: "",
      name: "invalid.json",
    });
    return expectSaga(uploadConfigSaga, uploadConfig(payload))
      .put(uploadConfigBusy(BUSY_GLOBAL))
      .put(uploadConfigError())
      .put(uploadConfigError("Unexpected token { in JSON at position 1"))
      .put(uploadConfigBusy(false))
      .run();
  });
});
