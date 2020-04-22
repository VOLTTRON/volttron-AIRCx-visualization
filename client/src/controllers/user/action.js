import { generateActions, generateSelectors, generateTypes } from "../util";

export const key = "user";

// fetch user
export const FETCH_USER = generateTypes(key, "current");
export const [
  fetchUser,
  fetchUserSuccess,
  fetchUserError,
  fetchUserBusy,
  fetchUserPoll,
] = generateActions(FETCH_USER);
export const [
  selectUser,
  selectUserError,
  selectUserBusy,
  selectUserPoll,
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
// login user
export const LOGIN_USER = generateTypes(key, "login");
export const [
  loginUser,
  loginUserSuccess,
  loginUserError,
  loginUserBusy,
] = generateActions(LOGIN_USER);
export const [
  selectLoginUser,
  selectLoginUserError,
  selectLoginUserBusy,
  ,
  selectLoginUserRequest,
] = generateSelectors(LOGIN_USER);
// logout user
export const LOGOUT_USER = generateTypes(key, "logout");
export const [
  logoutUser,
  logoutUserSuccess,
  logoutUserError,
  logoutUserBusy,
] = generateActions(LOGOUT_USER);
export const [
  selectLogoutUser,
  selectLogoutUserError,
  selectLogoutUserBusy,
  ,
  selectLogoutUserRequest,
] = generateSelectors(LOGOUT_USER);
// continue user session
export const CONTINUE_USER = generateTypes(key, "continue");
export const [
  continueUser,
  continueUserSuccess,
  continueUserError,
  continueUserBusy,
] = generateActions(CONTINUE_USER);
export const [
  selectContinueUser,
  selectContinueUserError,
  selectContinueUserBusy,
  ,
  selectContinueUserRequest,
] = generateSelectors(CONTINUE_USER);
