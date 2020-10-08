import {
  generateAction,
  generateActions,
  generateSelector,
  generateSelectors,
  generateType,
  generateTypes,
} from "../util";

export const key = "data";

// form
export const DATA_FORM = generateType(key, "form");
export const setDataForm = generateAction(DATA_FORM);
export const selectDataForm = generateSelector(key, DATA_FORM);

// fetch sources
export const FETCH_SOURCES = generateTypes(key, "sources");
export const [
  fetchSources,
  fetchSourcesSuccess,
  fetchSourcesError,
  fetchSourcesBusy,
] = generateActions(FETCH_SOURCES);
export const [
  selectSources,
  selectSourcesError,
  selectSourcesBusy,
  ,
  selectSourcesRequest,
] = generateSelectors(FETCH_SOURCES);

// fetch diagnostics
export const FETCH_DIAGNOSTICS = generateTypes(key, "diagnostics");
export const [
  fetchDiagnostics,
  fetchDiagnosticsSuccess,
  fetchDiagnosticsError,
  fetchDiagnosticsBusy,
] = generateActions(FETCH_DIAGNOSTICS);
export const [
  selectDiagnostics,
  selectDiagnosticsError,
  selectDiagnosticsBusy,
  ,
  selectDiagnosticsRequest,
] = generateSelectors(FETCH_DIAGNOSTICS);

// fetch detailed
export const FETCH_DETAILED = generateTypes(key, "detailed");
export const [
  fetchDetailed,
  fetchDetailedSuccess,
  fetchDetailedError,
  fetchDetailedBusy,
] = generateActions(FETCH_DETAILED);
export const [
  selectDetailed,
  selectDetailedError,
  selectDetailedBusy,
  ,
  selectDetailedRequest,
] = generateSelectors(FETCH_DETAILED);

// transmogrify detailed
export const TRANSMOGRIFY_DETAILED = generateTypes(key, "transmogrify");
export const [
  transmogrifyDetailed,
  transmogrifyDetailedSuccess,
  transmogrifyDetailedError,
  transmogrifyDetailedBusy,
  ,
  transmogrifyDetailedPerformance,
] = generateActions(TRANSMOGRIFY_DETAILED);
export const [
  selectTransmogrifyDetailed,
  selectTransmogrifyDetailedError,
  selectTransmogrifyDetailedBusy,
  ,
  selectTransmogrifyDetailedRequest,
] = generateSelectors(TRANSMOGRIFY_DETAILED);

// fetch aggregated
export const FETCH_AGGREGATED = generateTypes(key, "aggregated");
export const [
  fetchAggregated,
  fetchAggregatedSuccess,
  fetchAggregatedError,
  fetchAggregatedBusy,
] = generateActions(FETCH_AGGREGATED);
export const [
  selectAggregated,
  selectAggregatedError,
  selectAggregatedBusy,
  ,
  selectAggregatedRequest,
] = generateSelectors(FETCH_AGGREGATED);
