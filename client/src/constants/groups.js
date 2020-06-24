import _ from "lodash";
import moment from "moment";

export default {
  values: [
    {
      name: "day",
      label: "One Day",
      range: moment.duration(1, "days"),
      increment: "hour",
      step: moment.duration(1, "hours"),
      binDesc: "Date / Hour",
      buildBin: (timestamp) => moment(timestamp).format("YYYY-MM-DD HH"),
      binToDate: (bin) => moment(bin, "YYYY-MM-DD HH"),
    },
    {
      name: "month",
      label: "One Month",
      range: moment.duration(1, "months"),
      increment: "day",
      step: moment.duration(1, "days"),
      binDesc: "Date",
      buildBin: (timestamp) => moment(timestamp).format("YYYY-MM-DD"),
      binToDate: (bin) => moment(bin, "YYYY-MM-DD"),
    },
    {
      name: "year",
      label: "One Year",
      range: moment.duration(1, "years"),
      increment: "week",
      step: moment.duration(1, "weeks"),
      binDesc: "Year / Week",
      buildBin: (timestamp) => moment(timestamp).format("YYYY-WW"),
      binToDate: (bin) => moment(bin, "YYYY-WW"),
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
