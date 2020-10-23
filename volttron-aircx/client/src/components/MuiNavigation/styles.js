import { primary, secondary, background } from "constants/palette";

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer
  },
  drawer: {
    // width: set in inline styles
    zIndex: 0
  },
  toolbar: theme.mixins.toolbar,
  list: {
    marginTop: "0px"
  },
  listItemNotSelected: {
    marginLeft: "5px",
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  listItemSelected: {
    color: primary,
    background: background,
    textTransform: "none",
    borderLeft: `5px solid ${secondary}`,
    borderRadius: "0px",
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  listItemIcon: {
    minWidth: "50px"
  },
  listItemText: {
    textTransform: "none",
    marginTop: "0px",
    marginBottom: "0px"
  }
});

export default styles;
