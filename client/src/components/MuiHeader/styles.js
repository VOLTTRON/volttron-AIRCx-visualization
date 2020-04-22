import { black, primaryShade, white } from "constants/palette";

const styles = (theme) => ({
  root: {
    backgroundColor: white,
    zIndex: theme.zIndex.drawer + 1,
  },
  image: {
    height: "48px",
  },
  title: {
    flexGrow: 0,
    color: black,
  },
  page: {
    flexGrow: 0,
    paddingLeft: "90px",
    color: black,
  },
  mode: {
    flexGrow: 0,
    paddingLeft: "50px",
    color: primaryShade,
  },
  modeIcon: {
    color: primaryShade,
  },
  spacer: {
    flexGrow: 1,
  },
  user: {
    flexGrow: 0,
    marginLeft: "1em",
    marginRight: "0em",
    color: black,
  },
  toolbar: {
    paddingLeft: "90px",
    paddingRight: "90px",
    color: black,
    backgroundColor: white,
  },
});

export default styles;
