// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

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
