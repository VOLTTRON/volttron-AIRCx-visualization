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

import _ from "lodash";

export const SERVICE_URL = process.env.REACT_APP_API_URL;

export const setAuthorization = (token) => {
  if (token) {
    localStorage.setItem("authorization", token);
  } else {
    localStorage.clear();
  }
};

export const getAuthorization = () => {
  const token = localStorage.getItem("authorization");
  return `${token ? token : "invalid"}`;
};

export const createQuery = (params) => {
  return Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");
};

const validateResponse = async (response) => {
  switch (response.status) {
    case 0:
    case 302:
      throw Error("Session is invalid.");
    default:
      if (!response.ok) {
        let message = response.statusText;
        let result = null;
        try {
          result = await response.text();
          result = JSON.parse(result);
          message = _.get(
            result,
            "Message",
            _.isEmpty(result) ? message : result
          );
        } catch {
          // duck exception
        }
        throw Error(message);
      }
      return response;
  }
};

const handleResponse = async (response) => {
  let result = null;
  try {
    result = await response.text();
    result = JSON.parse(result);
  } catch {
    // purposely ducked catch
  }
  return result;
};

const handleError = (error) => {
  throw error;
};

const createTarget = (endpoint, params) => {
  let target = `${SERVICE_URL}/${endpoint}`;
  if (params) {
    const query = createQuery(params);
    target = `${target}?${query}`;
  }
  return target;
};

const defaultOptions = (authenticated) => {
  return {
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
    redirect: "manual", // manual, *follow, error
    // referrerPolicy: "client", // no-referrer, *client
    ...(authenticated && { credentials: "same-origin" }), // include, *same-origin, omit
    headers: {
      ...(authenticated && { Authorization: `Token ${getAuthorization()}` }),
    },
  };
};

/**
 * Determine if this endpoint should return mocked data.
 * Pass in true if the server endpoint is not complete and should always return mocked data.
 *
 * @param {Boolean} mocked
 */
export const isMocked = (mocked) => {
  return (
    (process.env.NODE_ENV !== "test" && mocked) ||
    (process.env.NODE_ENV === "development" &&
      /^[/s]*true|yes|t|y[/s]*$/i.test(process.env.REACT_APP_MOCK))
  );
};

/**
 * Gets mocked data from the mock file using the supplied key as part of the path and endpoint as the field.
 *
 * @param {String} key
 * @param {String} endpoint
 */
export const doMocked = (key, endpoint) => {
  return import(`./${key}/mock`).then((mock) => {
    if (_.isUndefined(_.get(mock, ["default", endpoint]))) {
      return null;
    }
    const data = mock.default[endpoint];
    return data.result;
  });
};

/**
 * Read (GET) from a service endpoint URL.
 *
 * @param {String} endpoint
 * @param {*} query
 * @param {Boolean} authenticated
 */
export const read = (endpoint, query = null, authenticated = false) => {
  const options = _.merge({}, defaultOptions(authenticated), {
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  let target = createTarget(endpoint, query);
  return fetch(target, options)
    .then(validateResponse)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Update (PUT) on service endpoint URL.
 *
 * @param {String} endpoint
 * @param {*} body
 * @param {*} query
 * @param {Boolean} authenticated
 */
export const update = (endpoint, body, query = null, authenticated = false) => {
  const options = _.merge({}, defaultOptions(authenticated), {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let target = createTarget(endpoint, query);
  return fetch(target, options)
    .then(validateResponse)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Create (POST) at a service endpoint URL.
 *
 * @param {String} endpoint
 * @param {*} body
 * @param {*} query
 * @param {Boolean} authenticated
 */
export const create = (endpoint, body, query = null, authenticated = false) => {
  const options = _.merge({}, defaultOptions(authenticated), {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  let target = createTarget(endpoint, query);
  return fetch(target, options)
    .then(validateResponse)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Remove (DELETE) from a service endpoint URL.
 *
 * @param {String} endpoint
 * @param {*} query
 * @param {Boolean} authenticated
 */
export const remove = (endpoint, query = null, authenticated = false) => {
  const options = _.merge({}, defaultOptions(authenticated), {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  let target = createTarget(endpoint, query);
  return fetch(target, options)
    .then(validateResponse)
    .then(handleResponse)
    .catch(handleError);
};

/**
 * Upload (POST) to a service endpoint URL.
 *
 * @param {String} endpoint
 * @param {*} file
 * @param {*} query
 * @param {Boolean} authenticated
 */
export const upload = (endpoint, file, query = null, authenticated = false) => {
  const data = new FormData();
  data.append("file", file.files[0]);
  const options = _.merge({}, defaultOptions(authenticated), {
    method: "POST",
    headers: {
      // setting the header here will cause the multipart post upload to fail
      // 'Content-Type': '?',
      Accept: "application/json",
    },
    body: data,
  });
  let target = createTarget(endpoint, query);
  return fetch(target, options)
    .then(validateResponse)
    .then(handleResponse)
    .catch(handleError);
};
