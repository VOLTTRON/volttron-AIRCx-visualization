import {
  generateAction,
  generateActions,
  generateSelector,
  generateSelectors,
  generateType,
  generateTypes,
} from "../util";

export const key = "data";

// current config
export const CURRENT_CONFIG = generateType(key, "current");
export const setCurrentConfig = generateAction(CURRENT_CONFIG);
export const selectCurrentConfig = generateSelector(key, CURRENT_CONFIG);

// edit config
export const EDIT_CONFIG = generateTypes(key, "edit");
export const [
  editConfig,
  editConfigSuccess,
  editConfigError,
  editConfigBusy,
] = generateActions(EDIT_CONFIG);
export const [
  selectEditConfig,
  selectEditConfigError,
  selectEditConfigBusy,
  ,
  selectEditConfigRequest,
] = generateSelectors(EDIT_CONFIG);

// transmogrify config
export const TRANSMOGRIFY_CONFIG = generateTypes(key, "transmogrify");
export const [
  transmogrifyConfig,
  transmogrifyConfigSuccess,
  transmogrifyConfigError,
  transmogrifyConfigBusy,
  transmogrifyConfigPoll,
] = generateActions(TRANSMOGRIFY_CONFIG);
export const [
  selectTransmogrifyConfig,
  selectTransmogrifyConfigError,
  selectTransmogrifyConfigBusy,
  selectTransmogrifyConfigPoll,
  selectTransmogrifyConfigRequest,
] = generateSelectors(TRANSMOGRIFY_CONFIG);

// upload sample
export const UPLOAD_SAMPLE = generateTypes(key, "sample");
export const [
  uploadSample,
  uploadSampleSuccess,
  uploadSampleError,
  uploadSampleBusy,
  uploadSamplePoll,
] = generateActions(UPLOAD_SAMPLE);
export const [
  selectSample,
  selectSampleError,
  selectSampleBusy,
  selectSamplePoll,
  selectSampleRequest,
] = generateSelectors(UPLOAD_SAMPLE);

// upload config
export const UPLOAD_CONFIG = generateTypes(key, "config");
export const [
  uploadConfig,
  uploadConfigSuccess,
  uploadConfigError,
  uploadConfigBusy,
  uploadConfigPoll,
] = generateActions(UPLOAD_CONFIG);
export const [
  selectConfig,
  selectConfigError,
  selectConfigBusy,
  selectConfigPoll,
  selectConfigRequest,
] = generateSelectors(UPLOAD_CONFIG);
