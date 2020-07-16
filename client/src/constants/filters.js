import { cdf, pmf } from "@stdlib/stats/base/dists/binomial";
import interval from "binomial-proportion";
import _ from "lodash";
import { all, dark, faults, inconclusive, unitOff } from "./palette";

const fault = {
  name: "faults",
  label: "Faults Only",
  alt: "Faults",
  single: "Fault",
  abbr: "Fault",
  color: faults,
  isType: (v) => _.get(getType(v), "name") === "faults",
};

const incon = {
  name: "inconclusive",
  label: "Inconclusive Only",
  alt: "Inconclusive",
  single: "Inconclusive",
  abbr: "Incon",
  color: inconclusive,
  isType: (v) => _.get(getType(v), "name") === "inconclusive",
};

const okay = {
  name: "okay",
  label: "Okay Only",
  alt: "Okay",
  single: "Okay",
  abbr: "Okay",
  color: dark,
  isType: (v) => _.get(getType(v), "name") === "okay",
};

const values = [
  fault,
  incon,
  {
    name: "unit-off",
    label: "Unit Off Only",
    alt: "Off Time",
    single: "Unit Off",
    abbr: "Unit Off",
    color: unitOff,
    isType: (v) => _.get(getType(v), "name") === "unit-off",
  },
  // uncomment to view and filter okay messages if available
  okay,
  {
    name: "all",
    label: "All States",
    alt: "All",
    single: "One",
    abbr: "All",
    color: all,
    isType: (v) => getType(v) !== null,
  },
];

const getType = (value) => {
  let s = value;
  if (_.isString(value)) {
    s = parseInt(value);
  }
  if (_.isNumber(value)) {
    s = value.toFixed(1);
  }
  switch (s) {
    case "-99":
      return values[1];
    default:
    // continue
  }
  const t = _.get(/-?\d+\.(\d+)/.exec(s), "1");
  switch (t) {
    case "0":
      return okay;
    case "1":
      return values[0];
    case "2":
      return values[1];
    case "3":
      return values[2];
    default:
      return null;
  }
};

const parse = function(value) {
  if (_.isNumber(value)) {
    return values[value];
  }
  value = _.isString(value) ? value.toLowerCase() : value;
  return _.concat(values, [okay]).find(
    (operation) =>
      operation.name === value ||
      operation.label.toLowerCase() === value ||
      operation.alt.toLowerCase() === value ||
      operation.single.toLowerCase() === value ||
      operation.abbr.toLowerCase() === value ||
      operation.color.toLowerCase() === value
  );
};

const getCount = (v) =>
  Array.isArray(v) ? v.length : _.isString(v) ? parseInt(v) : v;

const aggregate = (errors, passed) => {
  const min = 5;
  const p = 0.5;
  const a = 0.95;
  const x = getCount(errors);
  const n = x + getCount(passed);
  const c = cdf(x, n, p);
  // this function is not exactly the same as the python code
  const i = interval(x, n, a).lowerBound;
  const y = pmf(i, n, p);
  if (n > min) {
    if (y <= c) {
      return fault;
    } else {
      return okay;
    }
  } else {
    return incon;
  }
};

export default { values, okay, getType, parse, aggregate };
