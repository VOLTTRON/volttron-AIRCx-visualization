import _ from "lodash";
import xregexp from "xregexp";

export default {
  values: [
    {
      name: "NFD",
      label: "NFD",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["NFC", "NFKD", "NFKC"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.normalize("NFD"))
    },
    {
      name: "NFC",
      label: "NFC",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["NFD", "NFKD", "NFKC"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.normalize("NFC"))
    },
    {
      name: "NFKD",
      label: "NFKD",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["NFD", "NFC", "NFKC"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.normalize("NFKD"))
    },
    {
      name: "NFKC",
      label: "NFKC",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["NFD", "NFC", "NFKD"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.normalize("NFKC"))
    },
    {
      name: "LOWERCASE",
      label: "Lowercase",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["UPPERCASE"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.toLowerCase())
    },
    {
      name: "UPPERCASE",
      label: "Uppercase",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["LOWERCASE"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.toUpperCase())
    },
    {
      name: "LETTERS",
      label: "Letters",
      allowed: s => true,
      process: v =>
        _.isUndefined(v) ? "" : xregexp.replace(v, "[^\\s\\p{L}]", "")
    },
    {
      name: "NUMBERS",
      label: "Numbers",
      allowed: s => true,
      process: v =>
        _.isUndefined(v) ? "" : xregexp.replace(v, "[^\\s0-9]", "")
    },
    {
      name: "TRIM",
      label: "Trim",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["CONCATENATE"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : v.trim())
    },
    {
      name: "COMPACT",
      label: "Compact",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["CONCATENATE"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : xregexp.replace(v, /[\s]+/, " "))
    },
    {
      name: "CONCATENATE",
      label: "Concatenate",
      allowed: s =>
        _.isEmpty(
          _.intersection(
            s.map(n => n.name),
            ["TRIM", "COMPACT"]
          )
        ),
      process: v => (_.isUndefined(v) ? "" : xregexp.replace(v, /[\s]+/, ""))
    }
  ],
  parse: function(value) {
    if (_.isNumber(value)) {
      return this.values[value];
    }
    value = _.isString(value) ? value.toUpperCase() : value;
    return this.values.find(
      normalization =>
        normalization.label === value || normalization.name === value
    );
  }
};
