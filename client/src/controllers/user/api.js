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

import { create, doMocked, isMocked, remove, update } from "../api";

import { key } from "./action";

export const SERVICE_ENDPOINT = "user";
export const SERVICE_ENDPOINT_READ_USER = `${SERVICE_ENDPOINT}/get`;
export const SERVICE_ENDPOINT_REMOVE_USER = `${SERVICE_ENDPOINT}/delete`;
export const SERVICE_ENDPOINT_UPDATE_USER = `${SERVICE_ENDPOINT}/put`;
export const SERVICE_ENDPOINT_LOGIN = `${SERVICE_ENDPOINT}/login`;

export const readUser = () => {
  if (isMocked()) return doMocked(key, SERVICE_ENDPOINT_READ_USER);
  return create(`${SERVICE_ENDPOINT}`, {}, null, true);
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
