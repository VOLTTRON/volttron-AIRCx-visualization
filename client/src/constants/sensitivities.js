import _ from "lodash";
import { error, info, warning } from "./palette";

const values = [
  {
    name: "low",
    label: "Low",
    description: "Prioritizes high impact faults/measures",
    color: error,
    isType: (v) => !_.isUndefined(_.get(v, "low")),
  },
  {
    name: "normal",
    label: "Normal",
    description: "Shows likely faults/measures",
    color: warning,
    isType: (v) => !_.isUndefined(_.get(v, "normal")),
  },
  {
    name: "high",
    label: "High",
    description: "Shows borderline faults",
    color: info,
    isType: (v) => !_.isUndefined(_.get(v, "high")),
  },
];

const getType = (value) => {
  return !_.isUndefined(values.find((v) => v.isType(value)));
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
      operation.description.toLowerCase() === value ||
      operation.color.toLowerCase() === value
  );
};

export default { values, getType, parse };
