import { gray } from "constants/palette";

const styles = (theme) => ({
  container: {
    width: "100%",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: "0px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "90px",
  },
  message: {
    color: gray,
    textAlign: "center",
  },
  graph: {
    margin: "10px",
    width: "fit-content",
    display: "inline-block",
  },
  months: { display: "flex", textAlign: "center" },
  month: { flex: 1, color: gray },
  yAxis: {
    height: "648px",
    width: "90px",
    textAlign: "right",
    display: "inline-block",
    paddingTop: "10px",
  },
  yHeader: {
    color: gray,
    letterSpacing: "7px",
    display: "inline-block",
    position: "absolute",
    transform: "rotate(-90deg)",
    left: "0px",
    bottom: "50%",
  },
  days: { position: "relative" },
  day: { color: gray, fontSize: ".875rem", height: "21px" },
  xAxis: {
    width: "100%",
    height: "90px",
    textAlign: "center",
    paddingTop: "55px",
  },
  xHeader: { color: gray, letterSpacing: "7px" },
});

export default styles;
