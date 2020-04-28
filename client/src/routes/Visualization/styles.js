import { background, gray, primary } from "constants/palette";

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
  paper: {
    margin: "10px",
    width: "fit-content",
    display: "inline-block",
  },
  chart: { width: "227px", height: "648px", position: "relative" },
  mark: {
    background: primary,
    width: "16px",
    height: "16px",
    border: `3px solid ${background}`,
    position: "absolute",
    transition: "all .2s ease-in-out",
    "&:hover": {
      background: gray,
      transform: "scale(1.8)",
    },
  },
  months: { display: "flex", textAlign: "center" },
  month: { flex: 1, color: gray },
  yAxis: {
    height: "648px",
    width: "90px",
    textAlign: "right",
    display: "inline-block",
    marginTop: "-70px",
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
  footer: {
    width: "227px",
    height: "90px",
    textAlign: "center",
    paddingTop: "20px",
  },
  footerLabel: {},
  legend: {
    width: "100%",
    height: "160px",
    textAlign: "center",
    paddingTop: "60px",
  },
  legendMark: {
    width: "10px",
    height: "10px",
    display: "inline-block",
    marginRight: "8px",
  },
  legendSpacer: {
    display: "inline-block",
    width: "70px",
  },
  legendLabel: {
    display: "inline-block",
    color: gray,
    fontSize: ".8rem",
  },
});

export default styles;
