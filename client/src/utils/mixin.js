import _ from "lodash";

export default {
  handleChange: function(key) {
    return (event, value) => {
      value = _.get(event, "target.value", value);
      const state = key ? { [key]: value } : _.assign({}, value);
      const updated = _.intersection(_.keys(this.state), _.keys(state))
        .map((k) => this.state[k] !== state[k])
        .includes(true);
      if (updated) {
        this.setState(
          state,
          !_.isUndefined(this.handleUpdate) && this.handleUpdate(key)
        );
      }
    };
  },
};
