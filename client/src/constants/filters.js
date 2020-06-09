import _ from "lodash";
import { all, faults, inconclusive, unitOff } from "./palette";

const values = [
  {
    name: "faults",
    label: "Faults Only",
    alt: "Faults",
    single: "Fault",
    abbr: "Fault",
    color: faults,
    isType: (v) => _.get(getType(v), "name") === "faults",
  },
  {
    name: "inconclusive",
    label: "Inconclusive Only",
    alt: "Inconclusive",
    single: "Inconclusive",
    abbr: "Incon",
    color: inconclusive,
    isType: (v) => _.get(getType(v), "name") === "inconclusive",
  },
  {
    name: "unit-off",
    label: "Unit Off Only",
    alt: "Off Time",
    single: "Unit Off",
    abbr: "Unit Off",
    color: unitOff,
    isType: (v) => _.get(getType(v), "name") === "unit-off",
  },
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
  const s = `${value}`;
  switch (s) {
    case "-99":
      return values[1];
    default:
    // continue
  }
  const t = _.get(/-?\d+\.(\d+)/.exec(s), "1");
  switch (t) {
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
  return values.find(
    (operation) =>
      operation.name === value ||
      operation.label.toLowerCase() === value ||
      operation.alt.toLowerCase() === value ||
      operation.single.toLowerCase() === value
  );
};

export default { values, getType, parse };
