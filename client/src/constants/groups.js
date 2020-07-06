import _ from "lodash";
import moment from "moment";

const groupEntries = (entries) => {
  return entries.reduce((c, e, i) => {
    const [key, value] = e;
    const [date, range] = key.split(" ");
    const [start, end] = range.split("-");
    const [pk, pv] = i > 0 ? c[c.length - 1] : ["0-0-0 0:0-0:0", []];
    const [pd, pr] = pk.split(" ");
    const [ps, pe] = pr.split("-");
    if (date === pd && end === ps) {
      if (i > 0) {
        c.pop();
      }
      c.push([`${date} ${start}-${pe}`, _.concat(pv, value)]);
    } else {
      c.push(e);
    }
    return c;
  }, []);
};

export default {
  values: [
    {
      name: "day",
      label: "One Day",
      range: moment.duration(1, "days"),
      increment: "hour",
      step: moment.duration(1, "hours"),
      headers: ["Date", "Time"],
      values: [(v) => v.split(" ")[0], (v) => v.split(" ")[1]],
      buildBin: (timestamp) => {
        const date = moment(timestamp);
        return `${date.format("YYYY-MM-DD HH:00")}-${date
          .add(1, "hours")
          .format("HH:00")}`;
      },
      binToDate: (bin) => moment(bin, "YYYY-MM-DD HH:00"),
      groupEntries: groupEntries,
    },
    {
      name: "week",
      label: "One Week",
      range: moment.duration(1, "weeks"),
      increment: "hour",
      step: moment.duration(1, "hours"),
      headers: ["Date", "Time"],
      values: [(v) => v.split(" ")[0], (v) => v.split(" ")[1]],
      buildBin: (timestamp) => {
        const date = moment(timestamp);
        return `${date.format("YYYY-MM-DD HH:00")}-${date
          .add(1, "hours")
          .format("HH:00")}`;
      },
      binToDate: (bin) => moment(bin, "YYYY-MM-DD HH:00"),
      groupEntries: groupEntries,
    },
    {
      name: "month",
      label: "One Month",
      range: moment.duration(1, "month"),
      increment: "hour",
      step: moment.duration(1, "hours"),
      headers: ["Date", "Time"],
      values: [(v) => v.split(" ")[0], (v) => v.split(" ")[1]],
      buildBin: (timestamp) => {
        const date = moment(timestamp);
        return `${date.format("YYYY-MM-DD HH:00")}-${date
          .add(1, "hours")
          .format("HH:00")}`;
      },
      binToDate: (bin) => moment(bin, "YYYY-MM-DD HH:00"),
      groupEntries: groupEntries,
    },
    {
      name: "month-by-day",
      label: "One Month by Day",
      range: moment.duration(1, "months"),
      increment: "day",
      step: moment.duration(1, "days"),
      headers: ["Date"],
      values: [(v) => v],
      buildBin: (timestamp) => moment(timestamp).format("YYYY-MM-DD"),
      binToDate: (bin) => moment(bin, "YYYY-MM-DD"),
      groupEntries: (e) => e,
    },
    {
      name: "year-by-week",
      label: "One Year by Week",
      range: moment.duration(1, "years"),
      increment: "week",
      step: moment.duration(1, "weeks"),
      headers: ["Year", "Week"],
      values: [(v) => v.split("-")[0], (v) => v.split("-")[1]],
      buildBin: (timestamp) => moment(timestamp).format("YYYY-WW"),
      binToDate: (bin) => moment(bin, "YYYY-WW"),
      groupEntries: (e) => e,
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
