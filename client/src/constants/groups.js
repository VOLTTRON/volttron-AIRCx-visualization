import _ from "lodash";

export default {
  values: [
    {
      name: "day",
      label: "One Day",
    },
    {
      name: "week",
      label: "One Week",
    },
    {
      name: "month",
      label: "One Month",
    },
  ],
  parse: function(value) {
    if (_.isNumber(value)) {
      return this.values[value];
    }
    value = _.isString(value) ? value.toLowerCase() : value;
    return this.values.find(
      (operation) =>
        operation.name === value || operation.label.toLowerCase() === value
    );
  },
};
