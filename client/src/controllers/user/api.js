import { create, doMocked, isMocked, read, remove, update } from "../api";
import { key } from "./action";
export const SERVICE_ENDPOINT = "user";
export const SERVICE_ENDPOINT_READ_USER = `${SERVICE_ENDPOINT}/get`;
export const SERVICE_ENDPOINT_REMOVE_USER = `${SERVICE_ENDPOINT}/delete`;
export const SERVICE_ENDPOINT_UPDATE_USER = `${SERVICE_ENDPOINT}/put`;
export const SERVICE_ENDPOINT_LOGIN = `${SERVICE_ENDPOINT}/login`;

export const readUser = () => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_READ_USER);
  return read(`${SERVICE_ENDPOINT}`, null, true);
};

export const removeUser = () => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_REMOVE_USER);
  return remove(`${SERVICE_ENDPOINT}`, null, true);
};

export const updateUser = (email, password, preferences) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_UPDATE_USER);
  return update(
    `${SERVICE_ENDPOINT}`,
    {
      ...(email && { email: email }),
      ...(password && { password: password }),
      ...(preferences && { preferences: preferences }),
    },
    null,
    true
  );
};

export const login = (email, password) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_LOGIN);
  return create(`${SERVICE_ENDPOINT}/login`, {
    email: email,
    password: password,
  });
};
