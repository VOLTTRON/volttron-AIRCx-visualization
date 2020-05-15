import _ from "lodash";
import { all, faults, inconclusive, unitOff } from "./palette";

export default {
  values: [
    {
      name: "inconclusive",
      label: "Inconclusive Only",
      alt: "Inconclusive",
      single: "Inconclusive",
      color: inconclusive,
    },
    {
      name: "unit-off",
      label: "Unit Off Only",
      alt: "Off Time",
      single: "Unit Off",
      color: unitOff,
    },
    {
      name: "faults",
      label: "Faults Only",
      alt: "Faults",
      single: "Fault",
      color: faults,
    },
    {
      name: "all",
      label: "All States",
      alt: "All",
      single: "One",
      color: all,
    },
  ],
  parse: function(value) {
    if (_.isNumber(value)) {
      return this.values[value];
    }
    value = _.isString(value) ? value.toLowerCase() : value;
    return this.values.find(
      (operation) =>
        operation.name === value ||
        operation.label.toLowerCase() === value ||
        operation.alt.toLowerCase() === value ||
        operation.single.toLowerCase() === value
    );
  },
};
