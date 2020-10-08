import jsonpath from "jsonpath";
import _ from "lodash";
import React from "react";

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
