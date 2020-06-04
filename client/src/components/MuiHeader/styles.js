import { black, gray, primaryShade, white } from "constants/palette";

const styles = (theme) => ({
  root: {
    backgroundColor: white,
    zIndex: theme.zIndex.drawer + 1,
  },
  image: {
    height: "48px",
  },
  titleLabel: {
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
  navigation: {
    maxHeight: "32px",
  },
  title: {
    maxHeight: "32px",
  },
  row: {
    display: "flex",
    width: "100%",
    paddingLeft: "90px",
    paddingRight: "90px",
    background: white,
  },
  link: {
    textTransform: "none",
  },
  linkIcon: {
    marginRight: "7px",
  },
  form: {
    height: "140px",
    paddingTop: "25px",
  },
  site: {
    minWidth: "136px",
    marginRight: "24px",
    color: gray,
  },
  building: {
    minWidth: "136px",
    marginRight: "24px",
    color: gray,
  },
  device: {
    minWidth: "136px",
    marginRight: "24px",
    color: gray,
  },
  diagnostic: {
    minWidth: "166px",
    marginRight: "24px",
    color: gray,
  },
  group: {
    minWidth: "166px",
    marginRight: "24px",
    color: gray,
    paddingTop: "24px",
  },
  filter: {
    minWidth: "166px",
    marginRight: "24px",
    color: gray,
    paddingTop: "24px",
  },
  selectedBox: {
    width: ".8rem !important",
    height: ".8rem !important",
    verticalAlign: "sub",
    marginRight: "6px",
    border: `1px solid ${gray}`,
  },
  filterBox: {
    width: "1rem",
    height: "1rem",
    marginRight: "7px",
    border: `1px solid ${gray}`,
  },
  from: {
    width: "136px",
    minWidth: "136px",
    color: gray,
    paddingTop: "24px",
  },
  until: {
    width: "136px",
    minWidth: "136px",
    marginRight: "24px",
    color: gray,
    paddingTop: "24px",
  },
  to: { paddingTop: "30px" },
  toIcon: {
    color: gray,
  },
  loadButton: {
    width: "136px",
    minWidth: "136px",
    paddingTop: "24px",
  },
});

export default styles;
