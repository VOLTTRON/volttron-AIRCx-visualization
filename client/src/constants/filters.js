import _ from "lodash";
import { all, faults, inconclusive, unitOff } from "./palette";

export default {
  values: [
    {
      name: "faults",
      label: "Faults Only",
      color: faults,
    },
    {
      name: "inconclusive",
      label: "Inconclusive Only",
      color: inconclusive,
    },
    {
      name: "unit-off",
      label: "Unit Off Only",
      color: unitOff,
    },
    {
      name: "all",
      label: "All States",
      color: all,
    },
  ],
  parse: function(value) {
    if (_.isNumber(value)) {
      return this.values[value];
    }
    value = _.isString(value) ? value.toLowerCase() : value;
    return this.values.find(
      (operation) => operation.label === value || operation.name === value
    );
  },
};
