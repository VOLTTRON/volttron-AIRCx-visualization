import _ from "lodash";
import xregexp from "xregexp";

export default {
  values: [
    {
      name: "PASSTHROUGH",
      label: "Passthrough",
      process: v => (_.isUndefined(v) ? "" : v)
    },
    {
      name: "REDACT",
      label: "Redact",
      process: v =>
        _.isUndefined(v) ? "" : xregexp.replace(v, /./, "*", "all")
    },
    {
      name: "NULLIFY",
      label: "Nullify",
      process: v => (_.isUndefined(v) ? "" : "")
    },
    {
      name: "ENCRYPT_UUID",
      label: "Encrypt UUID",
      process: v =>
        _.isUndefined(v) ? "" : "2c8acc6e-b993-450a-a41a-03b76127503a"
    },
    {
      name: "ENCRYPT_UUID_PRESERVE",
      label: "Encrypt UUID Preserve",
      process: v =>
        _.isUndefined(v)
          ? ""
          : v.includes("-")
          ? "2c8acc6e-b993-450a-a41a-03b76127503a"
          : "2c8acc6eb993450aa41a03b76127503a"
    },
    {
      name: "ENCRYPT_HOSTNAME",
      label: "Encrypt Hostname",
      process: v => (_.isUndefined(v) ? "" : "eirsi.wo.hvp.tuadtqzpof")
    },
    {
      name: "ENCRYPT_URL",
      label: "Encrypt URL",
      process: v => (_.isUndefined(v) ? "" : "http://eirsi.wo.hvp.tuadtqzpof")
    },
    {
      name: "ENCRYPT",
      label: "Encrypt",
      process: v =>
        _.isUndefined(v)
          ? ""
          : "1KHwMJ+21tIG+O5KjBFfRnTITkD0v4llIHi2Ma6Xc1pHVdqJGtdQ5yyr9Ac6Rf"
    },
    {
      name: "HASH",
      label: "Hash",
      process: v =>
        _.isUndefined(v) ? "" : "IpgPlNymUSpx46T1IIIsfhLK8QuGDP0gdQ0AeNhZqr"
    },
    {
      name: "GEO_ANON",
      label: "Geo Anon",
      process: v => (_.isUndefined(v) ? "" : "[116.362,-8.57,11.444]")
    },
    {
      name: "IPANON",
      label: "IP Anon",
      process: v =>
        _.isUndefined(v)
          ? ""
          : /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test()
          ? "121.182.93.72"
          : /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test()
          ? "5229:ebb5:2854:476b:6ec2:4b10:f523:b0d"
          : ""
    },
    {
      name: "IPANON_INT",
      label: "IP Anon Integer",
      process: v => (_.isUndefined(v) ? "" : "2182370130")
    },
    {
      name: "BLOOM_FILTER",
      label: "Bloom Filter",
      process: v =>
        _.isUndefined(v) ? "" : "283564439018057557938290640072750694"
    },
    {
      name: "PATH_TENANT_ID",
      label: "Path Tenant ID",
      process: v => (_.isUndefined(v) ? "" : "not implemented")
    }
  ],
  parse: function(value) {
    if (_.isNumber(value)) {
      return this.values[value];
    }
    value = _.isString(value) ? value.toUpperCase() : value;
    return this.values.find(
      operation => operation.label === value || operation.name === value
    );
  }
};
