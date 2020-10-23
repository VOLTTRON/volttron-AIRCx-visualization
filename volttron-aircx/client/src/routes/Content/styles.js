import { attention, dark, gray, black } from "constants/palette";

const styles = {
  root: {
    padding: "1em",
    paddingLeft: "0px",
    paddingRight: "0px",
    height: "100%",
    maxWidth: "1200px"
  },
  button: {
    width: "100%"
  },
  header: {
    color: dark
  },
  iconLegend: {
    position: "absolute",
    right: "-10px",
    bottom: "-10px",
    zIndex: 0
  },
  form: {
    width: "100%",
    margin: 0,
    padding: ".25em"
  },
  select: {
    minHeight: "1.35rem",
    "& div": {
      lineHeight: "1.1875em",
      fontSize: ".8rem",
      paddingTop: "0em",
      paddingBottom: "0em"
    }
  },
  unavailable: {
    color: dark
  },
  totalArticles: {
    marginRight: "1em"
  },
  addReviewer: {
    marginLeft: "2em !important",
    marginRight: "1em !important"
  },
  spacer: {
    flex: 1
  },
  container: {
    display: "flex"
  },
  reviewer: {
    width: "100%",
    overflow: "hidden",
    minHeight: "1.1875em",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  value: {
    width: "100%",
    borderBottom: `1px solid ${black}`,
    display: "flex",
    "& :first-child": {
      flex: 1,
      display: "inline-block",
      width: "auto",
      height: "auto",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      textAlign: "left"
    }
  },
  valueCount: {
    display: "inline-block",
    width: "auto",
    height: "auto",
    textAlign: "right"
  },
  items: {
    padding: "1em"
  },
  progress: {
    position: "relative",
    flexGrow: 4,
    margin: ".3em",
    marginTop: ".5em"
  },
  progressLabel: {
    flex: 5
  },
  progressPercent: {
    position: "absolute"
  },
  dot: {
    margin: ".3em",
    marginTop: ".5em",
    marginLeft: "1em",
    height: "1em",
    width: "1em",
    borderRadius: "50%",
    display: "inline-block"
  },
  dotApproved: { backgroundColor: attention },
  dotReview: { backgroundColor: dark },
  dotCorrection: { backgroundColor: gray },
  key: {},
  keyApproved: { color: attention },
  keyPending: { color: dark },
  chartContainer: {
    position: "relative"
  },
  chartLegend: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "40%",
    pointerEvents: "none",
    zIndex: 0
  },
  legendContainer: {
    width: "95px"
  },
  legendRow: {
    display: "flex",
    width: "100%"
  },
  legendLabel: {
    display: "inline-block",
    flex: 1,
    fontSize: "10px"
  },
  legendValue: {
    display: "inline-block",
    flex: 1,
    lineHeight: "35px"
  },
  legendDivider: {
    display: "inline-block",
    width: "1px",
    backgroundColor: dark
  }
};

export default styles;
