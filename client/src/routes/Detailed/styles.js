import { backgroundShade, gray, light, white } from "constants/palette";

const styles = (theme) => ({
  container: {
    width: "100%",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    color: gray,
    textAlign: "center",
  },
  content: { paddingLeft: "140px", paddingRight: "140px" },
  left: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  middle: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  right: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  details: { paddingTop: "60px", paddingBottom: "60px" },
  tabs: { paddingTop: "30px", paddingBottom: "30px" },
  tab: { textTransform: "none", fontSize: "1.2em" },
  paperTop: {
    display: "block",
    position: "relative",
    zIndex: "+1",
    width: "300px",
    height: "320px",
    padding: "40px",
    background: white,
  },
  paperSub: {
    display: "block",
    width: "250px",
    height: "250px",
    marginLeft: "25px",
    marginRight: "25px",
    marginTop: "-5px",
    paddingTop: "19px",
    paddingLeft: "14px",
    paddingRight: "14px",
    paddingBottom: "14px",
    color: white,
    background: backgroundShade,
    opacity: "75%",
    overflow: "auto",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: `${light} !important`,
    },
  },
  tableCell: { color: white, padding: "6px" },
  chartContent: {
    paddingTop: "20px",
  },
});

export default styles;
