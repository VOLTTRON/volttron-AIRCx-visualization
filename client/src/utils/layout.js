import _ from "lodash";

/**
 * Move values so that they have a minimum amount of padding between them and stay within the defined bounds.
 *
 * @param {number[]} values
 * @param {number} min
 * @param {number} max
 * @param {number} padding
 * @returns {number[]}
 */
export const createPadding = (values, min = 0, max = 100, padding = 1) => {
  if (_.isEmpty(values)) {
    return values;
  }
  const first = 0;
  const last = values.length - 1;
  const sorted = _.sortBy(
    values.map((v, i) => ({
      v,
      i,
    })),
    "v"
  );
  const migrate = (start, end) => {
    if (start < end) {
      for (let i = start; i < end; i++) {
        sorted[i].v =
          i > first
            ? sorted[i].v < sorted[i - 1].v + padding
              ? sorted[i - 1].v + padding
              : sorted[i].v
            : sorted[i].v;
      }
    } else if (start > end) {
      for (let i = start; i > end; i--) {
        sorted[i].v =
          i < last
            ? sorted[i].v > sorted[i + 1].v - padding
              ? sorted[i + 1].v - padding
              : sorted[i].v
            : sorted[i].v;
      }
    }
  };
  // move values from the center outwards
  migrate(Math.ceil(values.length / 2), values.length);
  migrate(Math.floor(values.length / 2), -1);
  // move values from the outside inwards
  sorted[first].v = sorted[first].v < min ? min : sorted[first].v;
  migrate(first, values.length);
  sorted[last].v = sorted[last].v > max ? max : sorted[last].v;
  migrate(last, -1);
  // return values in original order
  return _.sortBy(sorted, "i").map((v) => v.v);
};
