import { generateActions, generateSelectors, generateTypes } from "../util";

export const key = "users";

// fetch users
export const FETCH_USERS = generateTypes(key, "list");
export const [
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
  fetchUsersBusy,
  fetchUsersPoll,
] = generateActions(FETCH_USERS);
export const [
  selectUsers,
  selectUsersError,
  selectUsersBusy,
  selectUsersPoll,
  selectUsersRequest,
] = generateSelectors(FETCH_USERS);
// fetch user
export const FETCH_USER = generateTypes(key, "current");
export const [
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  fetchUserBusy,
] = generateActions(FETCH_USER);
export const [
  selectUser,
  selectUserError,
  selectUserBusy,
  ,
  selectUserRequest,
] = generateSelectors(FETCH_USER);
// update user
export const UPDATE_USER = generateTypes(key, "update");
export const [
  updateUser,
  updateUserSuccess,
  updateUserError,
  updateUserBusy,
] = generateActions(UPDATE_USER);
export const [
  selectUpdateUser,
  selectUpdateUserError,
  selectUpdateUserBusy,
  ,
  selectUpdateUserRequest,
] = generateSelectors(UPDATE_USER);
// remove user
export const REMOVE_USER = generateTypes(key, "remove");
export const [
  removeUser,
  removeUserSuccess,
  removeUserError,
  removeUserBusy,
] = generateActions(REMOVE_USER);
export const [
  selectRemoveUser,
  selectRemoveUserError,
  selectRemoveUserBusy,
  ,
  selectRemoveUserRequest,
] = generateSelectors(REMOVE_USER);
// create user
export const CREATE_USER = generateTypes(key, "create");
export const [
  createUser,
  createUserSuccess,
  createUserError,
  createUserBusy,
] = generateActions(CREATE_USER);
export const [
  selectCreateUser,
  selectCreateUserError,
  selectCreateUserBusy,
  ,
  selectCreateUserRequest,
] = generateSelectors(CREATE_USER);
