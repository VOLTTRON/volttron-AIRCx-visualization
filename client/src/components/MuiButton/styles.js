import {
  background,
  dark,
  darker,
  disabled,
  error,
  errorTint,
  info,
  infoTint,
  lightest,
  primary,
  primaryTint,
  warning,
  warningTint,
} from "constants/palette";

const styles = {
  cancel: {
    backgroundColor: background,
    border: `0.0125rem solid ${dark}`,
    color: darker,
    "&:hover": {
      backgroundColor: dark,
      color: darker,
    },
  },
  default: {
    borderRadius: "3px",
    fontSize: "0.8rem",
    margin: "0",
    minWidth: "0",
    textTransform: "none",
    "&:first-child": {
      marginRight: "0.125rem",
    },
    "&:not(:first-child):not(last-child)": {
      margin: "0 .125rem",
    },
    "&:last-child": {
      marginLeft: "0.125rem",
    },
    "& span": {
      "& svg": {
        fontSize: "1rem",
      },
    },
    "&.xl": {
      "& svg, & img": {
        marginRight: "0.625rem",
      },
    },
    "&.disabled": {
      backgroundColor: `${disabled} !important`,
      border: "none",
      color: `${dark} !important`,
    },
  },
  outlined: {
    border: `2px solid ${primary}`,
    padding: "2px 8px",
  },
  primary: {
    backgroundColor: primary,
    color: lightest,
    "&:hover": {
      backgroundColor: primaryTint,
    },
  },
  info: {
    backgroundColor: info,
    color: lightest,
    "&:hover": {
      backgroundColor: infoTint,
    },
  },
  warning: {
    backgroundColor: warning,
    color: lightest,
    "&:hover": {
      backgroundColor: warningTint,
    },
  },
  error: {
    backgroundColor: error,
    color: lightest,
    "&:hover": {
      backgroundColor: errorTint,
    },
  },
};

export default styles;
