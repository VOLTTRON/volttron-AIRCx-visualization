import {
  verifiedTint,
  errorTint,
  infoTint,
  warningTint
} from "constants/palette";

const styles = {
  success: {
    backgroundColor: verifiedTint
  },
  error: {
    backgroundColor: errorTint
  },
  info: {
    backgroundColor: infoTint
  },
  warning: {
    backgroundColor: warningTint
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: "1em"
  },
  message: {
    width: "100%",
    display: "flex",
    textAlign: "left"
  },
  snackbar: {
    display: "inline-block"
  },
  center: {
    textAlign: "center",
    height: "100%"
  },
  pad: {
    padding: 80
  }
};

export default styles;
