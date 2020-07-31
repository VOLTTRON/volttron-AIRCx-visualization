import _ from "lodash";

// grays
export const white = "#FFFFFF";
export const lightest = "#F5F5F5";
export const lighter = "#D3D3D3";
export const light = "#A9A9A9";
export const gray = "#808080";
export const dark = "#585858";
export const darker = "#434343";
export const darkest = "#181818";
export const black = "#000000";

// colors
export const background = "#F6F8FC";
export const backgroundShade = "#454C5B";
export const primary = "#5786CD"; // primay color
export const primaryTint = "#667087"; // light primary
export const primaryShade = "#454C5B"; // dark primary
export const secondary = "#5786CD"; // bright primary
export const attention = "#5786CD"; // blue

// status
export const info = "#ffb73e"; // yellow
export const infoTint = "#ffcd79"; // light yellow
export const warning = "#f15c3e"; // orange
export const warningTint = "#f58a75"; // light orange
export const error = "#be0f34"; // red
export const errorTint = "#f15173"; // light red

// conditions
export const verified = "#01c353"; // green
export const verifiedTint = "#66db97"; // light green
export const selected = "#f87e1c"; // orange
export const selectedTint = "#fbe7d2"; // light orange
export const active = "#5786CD"; // bright primary
export const disabled = "#d8d8d8";

/**
 * Use the supplied value to derive a color representation.
 * This is not a traditional color parsing method.
 * This method is to convert values like percentage, error names, etc to a color.
 * Numbers should be on a scale of 0 to 100. Strings should be a text representation.
 *
 * @param {Number:String} value
 */
export const deriveColor = (value) => {
  if (_.isNumber(value)) {
    if (value > 90) {
      return error;
    } else if (value > 80) {
      return warning;
    } else if (value > 60) {
      return info;
    } else if (value > 40) {
      return verified;
    } else {
      return gray;
    }
  } else if (_.isString(value)) {
    const string = value.toLowerCase().replace(/[\s_-]+/, "");
    switch (string) {
      case "extreme":
      case "active":
      case "hot":
      case "donotdistribute":
        return secondary;
      case "high":
      case "error":
      case "severe":
        return error;
      case "medium":
      case "warning":
      case "warn":
      case "moderate":
        return warning;
      case "low":
      case "info":
      case "minimal":
        return info;
      case "normal":
      case "verified":
      case "routine":
      case "good":
        return verified;
      case "select":
      case "selected":
      case "selection":
        return selected;
      case "none":
      default:
        return gray;
    }
  }
};

/////////////////////////////////////////////////////////////
// Charts are the only use case for special color schemes. //
/////////////////////////////////////////////////////////////

export const faults = "#D7191C";
export const inconclusive = "#FDAE61";
export const unitOff = "#ABD9E9";
export const all = "#FFFFFF";
export const likely = "#A9A9A9";
