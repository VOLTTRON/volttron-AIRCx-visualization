import { create, doMocked, isMocked, read, remove, update } from "../api";
import { key } from "./action";

export const SERVICE_ENDPOINT = "users";
export const SERVICE_ENDPOINT_READ_USER = `${SERVICE_ENDPOINT}/1/get`;
export const SERVICE_ENDPOINT_READ_USERS = `${SERVICE_ENDPOINT}/get`;
export const SERVICE_ENDPOINT_CREATE_USER = `${SERVICE_ENDPOINT}/post`;
export const SERVICE_ENDPOINT_REMOVE_USER = `${SERVICE_ENDPOINT}/delete`;
export const SERVICE_ENDPOINT_UPDATE_USER = `${SERVICE_ENDPOINT}/put`;

export const readUsers = () => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_READ_USERS);
  return read(`${SERVICE_ENDPOINT}`, null, true);
};

export const readUser = (id) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_READ_USER);
  return read(`${SERVICE_ENDPOINT}/${id}`, null, true);
};

export const removeUser = (id) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_REMOVE_USER);
  return remove(`${SERVICE_ENDPOINT}/${id}`, null, true);
};

export const updateUser = (id, email, password, organization, scope) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_UPDATE_USER);
  return update(`${SERVICE_ENDPOINT}/${id}`, {
    ...(email && { email: email }),
    ...(password && { password: password }),
    ...(organization && { organizationId: organization.id }),
    ...(scope && { scope: scope }),
  });
};

export const createUser = (email, password, organization, scope) => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_CREATE_USER);
  return create(`${SERVICE_ENDPOINT}`, {
    email: email,
    password: password,
    ...(organization && { organizationId: organization.id }),
    scope: scope,
  });
};
