import { lightest, primary, primaryTint } from "constants/palette";

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  image: {
    height: "48px"
  },
  title: {
    flexGrow: 0,
    color: lightest
  },
  page: {
    flexGrow: 0,
    paddingLeft: "80px",
    color: lightest
  },
  mode: {
    flexGrow: 0,
    paddingLeft: "50px",
    color: primaryTint
  },
  modeIcon: {
    color: primaryTint
  },
  spacer: {
    flexGrow: 1
  },
  user: {
    flexGrow: 0,
    marginLeft: "1em",
    marginRight: "0em",
    color: lightest
  },
  toolbar: {
    paddingLeft: "50px",
    backgroundColor: primary
  }
});

export default styles;
