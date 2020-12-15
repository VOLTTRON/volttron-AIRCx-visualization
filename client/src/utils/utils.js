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

import React from "react";
import _ from "lodash";
import jsonpath from "jsonpath";

export function getDocumentWidth() {
  // We always want the client width
  return Math.max(
    // document.body.scrollWidth,
    // document.documentElement.scrollWidth,
    // document.body.offsetWidth,
    // document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

export function getDocumentHeight() {
  // We always want the client height
  return Math.max(
    // document.body.scrollHeight,
    // document.documentElement.scrollHeight,
    // document.body.offsetHeight,
    // document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

/**
 * Turn the input value into an acronym.
 *
 * @param {String} value
 */
export const acronymize = (value) => {
  return value
    .trim()
    .replace(/[^\w\d\s]|[_]/gi, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([a-z])[\w\d]*/gi, "$1")
    .replace(/\s+/gi, "");
};

/**
 * Parse a string and return a boolean value.
 *
 * @param {String} value
 */
export const parseBoolean = (value) => /^\s*true|yes|t|y\s*$/i.test(value);

/**
 * Log the error stack to console if running in development environment.
 * @param {Error} error
 */
export const logError = (error) => {
  if (error && process.env.NODE_ENV === "development") {
    console.log(`[${error.message}]: ${error.stack}`);
  }
};

/**
 * Wraps the child component(s) only if the condition is met.
 * Requires three props: condition, wrapper, and children.
 * The condition is a boolean which determines if the wrapper should be utilized.
 * The wrapper is a callback function which passes the children elements.
 * The children are standard React children elements.
 * @param {*} props
 */
export const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

/**
 * Create a text span for displaying a search term.
 * @param {*} item the item which may contain terms
 * @param {String} field the field to return
 */
export const createTerm = (item, field) => {
  const terms = _.get(item, ["terms", field]);
  if (terms) {
    return (
      <span>
        {terms[0]}
        <mark>
          <strong>{terms[1]}</strong>
        </mark>
        {terms[2]}
      </span>
    );
  } else {
    return <span>{item[field]}</span>;
  }
};

const getTerm = (item, key, term) => {
  const value = item[key];
  const index = _.isString(value) ? value.toLowerCase().indexOf(term) : -1;
  const temp =
    index === -1 || term.length === 0
      ? [value, "", ""]
      : [
          value.slice(0, index),
          value.slice(index, index + term.length),
          value.slice(index + term.length),
        ];
  return { [key]: temp };
};

const addTerm = (item, key, term) => {
  _.assign(item, { terms: getTerm(item, key, term) });
};

/**
 * Searches all of the text fields in the list of items which contain the search value.
 * Returns the complete array if search is not specified.
 * The terms are placed into a terms field which contains an array with three values: prefix, matching term, and suffix.
 * The keys array can contain either a list of fields or jsonpaths (https://www.npmjs.com/package/jsonpath).
 * Fields and jsonpaths can not be mixed. Jsonpaths must start with $.
 * @param {Array} items the list of items to filter
 * @param {String} search the search term
 * @param {Array[String]} keys an optional list of field keys to search in
 */
export const filter = (items, search, keys) => {
  const term = search && search.length > 0 ? search.toLowerCase() : "";
  const jsonpaths =
    Array.isArray(keys) && keys.filter((key) => key.startsWith("$"));
  if (jsonpaths && jsonpaths.length > 0) {
    return items
      .filter((item) => {
        return jsonpaths.find((jp) => {
          const tmp = jsonpath
            .query(item, jp)
            .find((v) =>
              _.isString(v) ? v.toLowerCase().includes(term) : false
            );
          return tmp && tmp.length > 0;
        });
      })
      .map((item) => {
        const copy = _.cloneDeep(item);
        jsonpaths.forEach((jp) =>
          jsonpath.nodes(copy, jp).forEach((node) => {
            if (
              _.isString(node.value) &&
              node.value.toLowerCase().includes(term)
            ) {
              const tmp =
                node.path.length <= 2
                  ? copy
                  : _.get(copy, node.path.splice(1, node.path.length - 2));
              addTerm(tmp, node.path[node.path.length - 1], term);
            }
          })
        );
        return copy;
      });
  } else {
    return items
      .filter((item) =>
        term
          ? (keys ? keys : Object.keys(item)).find((key) =>
              _.isString(item[key])
                ? item[key].toLowerCase().includes(term)
                : false
            )
          : true
      )
      .map((item) => {
        const terms = (keys ? keys : Object.keys(item))
          .map((key) => {
            return getTerm(item, key, term);
          })
          .reduce((terms, term) => ({ ...terms, ...term }), {});
        return { ...item, terms };
      });
  }
};
