import {
  SERVICE_ENDPOINT_LOGIN,
  SERVICE_ENDPOINT_READ_USER,
  SERVICE_ENDPOINT_REMOVE_USER,
  SERVICE_ENDPOINT_UPDATE_USER,
} from "./api";

export default {
  [SERVICE_ENDPOINT_LOGIN]: {
    payload: {
      email: "demo@pnnl.gov",
      password: "password",
    },
    result: "sdkflksnvnsdlkvjkldfnd",
  },
  [SERVICE_ENDPOINT_READ_USER]: {
    payload: null,
    result: {
      id: 1,
      email: "demo@pnnl.gov",
      scope: "user",
      preferences: {},
    },
  },
  [SERVICE_ENDPOINT_REMOVE_USER]: {
    payload: null,
    result: true,
  },
  [SERVICE_ENDPOINT_UPDATE_USER]: {
    payload: {
      email: "demo@pnnl.gov",
      password: "password",
      preferences: {},
    },
    result: {
      id: 1,
      email: "demo@pnnl.gov",
      scope: "user",
      preferences: {},
    },
  },
};
