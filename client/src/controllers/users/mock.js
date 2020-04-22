import {
  SERVICE_ENDPOINT_CREATE_USER,
  SERVICE_ENDPOINT_READ_USER,
  SERVICE_ENDPOINT_READ_USERS,
  SERVICE_ENDPOINT_REMOVE_USER,
  SERVICE_ENDPOINT_UPDATE_USER,
} from "./api";

export default {
  [SERVICE_ENDPOINT_READ_USER]: {
    payload: { id: 1 },
    result: {
      id: 1,
      email: "demo@pnnl.gov",
      scope: "user",
      preferences: {},
    },
  },
  [SERVICE_ENDPOINT_READ_USERS]: {
    payload: null,
    result: [
      {
        id: 1,
        email: "demo@pnnl.gov",
        scope: "user",
        preferences: {},
      },
    ],
  },
  [SERVICE_ENDPOINT_REMOVE_USER]: {
    payload: { id: 1 },
    result: true,
  },
  [SERVICE_ENDPOINT_UPDATE_USER]: {
    payload: {
      id: 1,
      email: "demo@pnnl.gov",
      password: "password",
      scope: "user",
      preferences: {},
    },
    result: {
      id: 1,
      email: "demo@pnnl.gov",
      scope: "user",
      preferences: {},
    },
  },
  [SERVICE_ENDPOINT_CREATE_USER]: {
    payload: {
      email: "demo@pnnl.gov",
      password: "password",
      scope: "user",
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
