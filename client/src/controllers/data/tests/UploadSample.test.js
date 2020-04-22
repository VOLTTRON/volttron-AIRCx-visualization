import { reset } from "controllers/action";
import { BUSY_GLOBAL } from "controllers/busy/action";
import {
  selectSampleRequest,
  uploadSample,
  uploadSampleBusy,
  uploadSampleError,
  uploadSampleSuccess,
} from "controllers/data/action";
import { UNIQUE_KEY_UPLOAD_SAMPLE } from "controllers/data/api";
import mock from "controllers/data/mock";
import { uploadSampleSaga } from "controllers/data/saga";
import configureStore from "controllers/store";
import _ from "lodash";
import { expectSaga } from "redux-saga-test-plan";
const data = mock[UNIQUE_KEY_UPLOAD_SAMPLE];

const reduxStore = configureStore({});

describe("data.uploadSample()", () => {
  beforeEach(() => {
    reduxStore.dispatch(reset());
  });

  it("upload action should be dispatched.", () => {
    const { payload } = data;
    reduxStore.dispatch(uploadSample(payload));
    expect(selectSampleRequest(reduxStore.getState())).toEqual(payload);
  });

  it("read sample saga should complete normally.", () => {
    const { payload, result } = data;
    return expectSaga(uploadSampleSaga, uploadSample(payload))
      .put(uploadSampleBusy(BUSY_GLOBAL))
      .put(uploadSampleError())
      .put(uploadSampleSuccess(result))
      .put(uploadSampleBusy(false))
      .run();
  });

  it("read sample saga should produce error.", () => {
    const payload = _.merge(
      new Blob(
        ["COL_ONE,COL_TWO,COL_THREE,COL_FOUR\r\n123456,Stacy,01/01/2001"],
        { type: "text/csv" }
      ),
      { lastModifiedDate: "", name: "invalid.csv" }
    );
    return expectSaga(uploadSampleSaga, uploadSample(payload))
      .put(uploadSampleBusy(BUSY_GLOBAL))
      .put(uploadSampleError())
      .put(uploadSampleError("Row length does not match headers"))
      .put(uploadSampleBusy(false))
      .run();
  });
});
