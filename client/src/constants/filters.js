import { cdf, pmf, quantile } from "@stdlib/stats/base/dists/binomial";
import _ from "lodash";
import {
  all,
  dark,
  faults,
  inconclusive,
  lighter,
  likely,
  primary,
  unitOff,
} from "./palette";

const noData = {
  name: "no-data",
  label: "No Analysis Only",
  alt: "No Analysis",
  single: "No Analysis",
  abbr: "Empty",
  color: primary,
  isType: (v) => _.get(getType(v), "name") === "no-data",
  show: (f) => _.includes(["no-data"], _.get(f, "name")),
};

const outsideRange = {
  name: "outside-range",
  label: "Outside Date Range Only",
  alt: "Outside Date Range",
  single: "Outside Date Range",
  abbr: "Outside",
  color: lighter,
  isType: (v) => _.get(getType(v), "name") === "outside-range",
  show: (f) => _.includes(["outside-range"], _.get(f, "name")),
};

const fault = {
  name: "faults",
  label: "Faults Only",
  alt: "Faults",
  single: "Fault",
  abbr: "Fault",
  color: faults,
  isType: (v) => _.get(getType(v), "name") === "faults",
  show: (f) =>
    _.includes(["faults", "no-data", "outside-range"], _.get(f, "name")),
};

const incon = {
  name: "inconclusive",
  label: "Inconclusive Only",
  alt: "Inconclusive",
  single: "Inconclusive",
  abbr: "Incon",
  color: inconclusive,
  isType: (v) => _.get(getType(v), "name") === "inconclusive",
  show: (f) =>
    _.includes(["inconclusive", "no-data", "outside-range"], _.get(f, "name")),
};

const off = {
  name: "unit-off",
  label: "Unit Off Only",
  alt: "Off Time",
  single: "Unit Off",
  abbr: "Unit Off",
  color: unitOff,
  isType: (v) => _.get(getType(v), "name") === "unit-off",
  show: (f) =>
    _.includes(["unit-off", "no-data", "outside-range"], _.get(f, "name")),
};

const okay = {
  name: "okay",
  label: "Okay Only",
  alt: "Okay",
  single: "Okay",
  abbr: "Okay",
  color: dark,
  isType: (v) => _.get(getType(v), "name") === "okay",
  show: (f) =>
    _.includes(["okay", "no-data", "outside-range"], _.get(f, "name")),
};

const values = [
  fault,
  incon,
  off,
  // uncomment to view and filter okay messages if available
  okay,
  // combined states
  {
    name: "aggregate",
    label: "Likely State",
    alt: "Likely",
    single: "Likely",
    abbr: "Likely",
    color: likely,
    isType: (v) => _.includes(["faults", "okay"], _.get(getType(v), "name")),
    show: (f) =>
      _.includes(
        ["faults", "inconclusive", "okay", "outside-range"],
        _.get(f, "name")
      ),
  },
  {
    name: "all",
    label: "All States",
    alt: "All",
    single: "One",
    abbr: "All",
    color: all,
    isType: (v) => getType(v) !== null,
    show: (f) =>
      _.includes(
        [
          "faults",
          "inconclusive",
          "okay",
          "unit-off",
          "no-data",
          "outside-range",
        ],
        _.get(f, "name")
      ),
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
    case "-99.0":
      return incon;
    default:
    // continue
  }
  const t = _.get(/-?\d+\.(\d+)/.exec(s), "1");
  switch (t) {
    case "0":
      return okay;
    case "1":
      return fault;
    case "2":
      return incon;
    case "3":
      return off;
    default:
      return null;
  }
};

const parse = function(value) {
  if (_.isNumber(value)) {
    return values[value];
  }
  value = _.isString(value) ? value.toLowerCase() : value;
  return _.concat(values, [okay, noData, outsideRange]).find(
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

const interval = (a, n, p) => {
  const q1 = (1.0 - a) / 2;
  const q2 = (1.0 + a) / 2;
  const l = quantile(q1, n, p);
  const u = quantile(q2, n, p);
  return [l, u];
};

const aggregate = (errors, passed) => {
  const min = 5;
  const p = 0.5;
  const a = 0.95;
  const x = getCount(errors);
  const n = x + getCount(passed);
  const c = cdf(x, n, p);
  const i = interval(a, n, p)[0];
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
