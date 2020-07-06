import { error, gray, primary } from "constants/palette";

const styles = {
  attribute: {
    padding: "0.3125rem 0",
  },
  checkbox: {
    padding: "0",
    marginLeft: "0",
  },
  header: {
    "font-size": "1rem",
    "font-weight": "bold",
  },
  textArea: {
    padding: ".25em",
    "& textarea": {
      fontSize: ".8rem",
      padding: "0.3125em",
    },
    "& div:first-child": {
      padding: "0em",
    },
  },
  textField: {
    padding: "0",
    "& input": {
      fontSize: ".8rem",
      height: "2em",
      padding: "0.3125em",
    },
  },
  fullWidth: {
    width: "100%",
  },
  form: {
    margin: 0,
    padding: "0",
  },
  required: {
    color: error,
    display: "inline-block",
  },
  title: {
    color: gray,
  },
  section: {
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderTop: `1px solid ${gray}`,
    "& > div": {
      paddingTop: "12px",
    },
  },
  select: {
    "& div": {
      fontSize: ".8rem",
      height: "2em",
      lineHeight: "1.1875em",
      padding: "0.3125em",
      width: "100%",
    },
    "& svg": {
      color: primary,
    },
  },
  value: {
    display: "flex",
    "& p": {
      fontSize: ".8rem",
      lineHeight: "1.1875rem",
    },
    "& :last-child": {
      display: "inline-block",
      width: "auto",
      textAlign: "right",
    },
    "& :nth-child(2n)": {
      flex: 1,
      display: "inline-block",
      width: "auto",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  datePicker: {
    padding: "0",
    margin: "0",
    "& input": {
      fontSize: ".8rem",
      height: "2em",
      padding: "0.3125em",
    },
    "& > div": {
      paddingLeft: "0.3125em",
      paddingRight: "0px",
    },
    "& svg": {
      color: primary,
    },
  },
};

export default styles;
