import _ from "lodash";
import moment from "moment";

export default {
  values: [
    {
      name: "day",
      label: "One Day",
      range: moment.duration(1, "days"),
      increment: "hour",
    },
    {
      name: "week",
      label: "One Week",
      range: moment.duration(1, "weeks"),
      increment: "hour",
    },
    {
      name: "month",
      label: "One Month",
      range: moment.duration(1, "months"),
      increment: "day",
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
