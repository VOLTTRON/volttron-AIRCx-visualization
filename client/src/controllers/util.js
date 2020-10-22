import _ from "lodash";
import { createSelector } from "reselect";

export var getTimestamp = () => new Date();

/**
 * Override this function within testing to return a static timestamp.
 */
export const timestampGenerator = (generator) => (getTimestamp = generator);

export const ResetType = {
  RESET: "reset",
};
const { RESET } = ResetType;

export const ActionTypes = {
  REQUEST: "request",
  BUSY: "busy",
  SUCCESS: "success",
  ERROR: "error",
  POLL: "poll",
  PERFORMANCE: "performance",
};
const { REQUEST, BUSY, SUCCESS, ERROR, POLL, PERFORMANCE } = ActionTypes;

/**
 * Get the key used to create this type.
 *
 * @param {String} type
 * @returns {String}
 */
export const getKeyType = (type) => {
  const types = type.split("/");
  if (types.length < 2) {
    return "";
  } else {
    return types[0];
  }
};

/**
 * Get the action type used to create this type.
 *
 * @param {String} type
 * @returns {String}
 */
export const getActionType = (type) => {
  const types = type.split("/");
  if (types.length < 2) {
    return "";
  } else {
    return types[types.length - 1];
  }
};

/**
 * Checks whether this is a reset type.
 *
 * @param {String} key
 * @param {String} type
 * @returns {Boolean}
 */
export const isResetType = (key, type) => {
  switch (type) {
    case RESET:
    case `${key}/${RESET}`:
      return true;
    default:
      return false;
  }
};

/**
 * Checks whether this is an action type of: REQUEST, BUSY, SUCCESS, or ERROR.
 *
 * @param {String} key
 * @param {String} type
 * @returns {Boolean}
 */
export const isActionType = (key, type) => {
  if (getKeyType(type) !== key) {
    return false;
  }
  switch (getActionType(type)) {
    case REQUEST:
    case BUSY:
    case SUCCESS:
    case ERROR:
    case PERFORMANCE:
      return true;
    default:
      return false;
  }
};

/**
 * Create a payload for a successful action result.
 * Pass null to clear the result.
 *
 * @param {*} payload
 * @returns {*}
 */
export const createSuccessPayload = (payload) => {
  if (payload === null) {
    return null;
  } else if (_.isBoolean(payload)) {
    const timestamp = getTimestamp();
    return {
      timestamp: timestamp,
    };
  } else {
    return payload;
  }
};

/**
 * Create a payload for an action that produced an error.
 * Pass null to clear the error.
 *
 * @param {*} payload
 * @returns {*}
 */
export const createErrorPayload = (payload) => {
  if (payload) {
    const timestamp = getTimestamp();
    return {
      timestamp: timestamp,
      error: payload,
    };
  } else {
    return null;
  }
};

/**
 * Create a payload for an action that is busy.
 * Pass null to clear the busy state.
 *
 * @param {*} payload
 * @returns {*}
 */
export const createBusyPayload = (payload) => {
  if (payload) {
    const timestamp = getTimestamp();
    return {
      timestamp: timestamp,
      ...(!_.isBoolean(payload) && { type: payload }),
    };
  } else {
    return null;
  }
};

/**
 * Generate a single type.
 *
 * @param {String} key
 * @param {String} name
 * @returns {String}
 */
export const generateType = (key, name) => {
  return `${key}/${name}`;
};

/**
 * Generates a map of action types for the specified unique key and name.
 *
 * @param {String} key
 * @param {*} name
 */
export const generateTypes = (key, name) => {
  const obj = {
    key: key,
    [REQUEST]: `${key}/${name}/${REQUEST}`,
    [BUSY]: `${key}/${name}/${BUSY}`,
    [SUCCESS]: `${key}/${name}/${SUCCESS}`,
    [ERROR]: `${key}/${name}/${ERROR}`,
    [POLL]: `${key}/${name}/${POLL}`,
    [PERFORMANCE]: `${key}/${name}/${PERFORMANCE}`,
    [RESET]: `${key}/${RESET}`,
  };
  return obj;
};

/**
 * Create types from the specified action by reverse engineering.
 *
 * @param {} action
 */
export const createTypes = (action) => {
  const { type } = action;
  const types = type.split("/");
  const key = types[0];
  const name = types.slice(1, -1).join("/");
  return generateTypes(key, name);
};

export const createToJSSelector = (input) => {
  return createSelector(input, (value) =>
    value && value.toJS ? value.toJS() : value
  );
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
};

export const generateSelector = (key, type) => {
  return createToJSSelector((state) => {
    if (!state) {
      throw new Error(`Selector missing state for: ${key}/${type}`);
    }
    return state.getIn([key, ...type.split("/")]);
  });
};

/**
 * Generate selectors for the specified types generated using generateTypes().
 *
 * @see this#generateTypes
 * @param {*} types
 * @returns {Array} [SUCCESS, ERROR, BUSY, POLL, REQUEST]
 */
export const generateSelectors = (types) => {
  return [
    generateSelector(types.key, types[SUCCESS]),
    generateSelector(types.key, types[ERROR]),
    generateSelector(types.key, types[BUSY]),
    generateSelector(types.key, types[POLL]),
    generateSelector(types.key, types[REQUEST]),
    generateSelector(types.key, types[PERFORMANCE]),
  ];
};

export const generateAction = (type) => {
  const t = getActionType(type);
  switch (t) {
    case BUSY:
      return (payload) => ({
        type,
        payload: createBusyPayload(payload),
      });
    case ERROR:
      return (payload) => ({
        type,
        payload: createErrorPayload(payload),
      });
    case SUCCESS:
      return (payload) => ({
        type,
        payload: createSuccessPayload(payload),
      });
    case REQUEST:
    case PERFORMANCE:
    default:
      return (payload) => ({ type, payload });
  }
};

/**
 * Generate actions for the specified types generated using generateTypes().
 *
 * @see this#generateTypes
 * @param {*} types
 * @returns {Array} [REQUEST, SUCCESS, ERROR, BUSY, POLL]
 */
export const generateActions = (types) => {
  return [
    generateAction(types[REQUEST]),
    generateAction(types[SUCCESS]),
    generateAction(types[ERROR]),
    generateAction(types[BUSY]),
    generateAction(types[POLL]),
    generateAction(types[PERFORMANCE]),
  ];
};
