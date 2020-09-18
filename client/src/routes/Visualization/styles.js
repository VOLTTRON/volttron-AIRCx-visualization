import { background, gray, light, primary, white } from "constants/palette";

const styles = (theme) => ({
  container: {
    width: "100%",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: "40px",
    margin: "0px",
  },
  flex: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    marginLeft: "20px",
    marginRight: "20px",
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
  chart: {
    minWidth: "227px",
    height: "668px",
    position: "relative",
    overflow: "hidden",
  },
  mark: {
    background: primary,
    width: "12px",
    height: "12px",
    position: "absolute",
  },
  selected: {
    background: light,
    width: "24px",
    height: "24px",
    position: "absolute",
    borderRadius: "12px",
  },
  hover: {
    border: `1px solid ${background}`,
    transition: "all .2s ease-in-out",
    "&:hover": {
      background: gray,
      transform: "scale(2.0)",
      zIndex: "+1",
    },
  },
  monthsTitle: { width: "100%", textAlign: "center", paddingBottom: "6px" },
  months: { display: "flex", textAlign: "center", paddingLeft: "4px" },
  month: { flex: 1, color: gray },
  yAxis: {
    height: "638px",
    width: "90px",
    textAlign: "right",
    display: "inline-block",
    marginTop: "88px",
    "& h5": {
      left: "15px",
    },
  },
  yHeader: {
    color: gray,
    display: "inline-block",
    position: "absolute",
    transform: "rotate(-90deg)",
    bottom: "50%",
  },
  days: { position: "relative" },
  day: { color: gray, fontSize: ".875rem", height: "21px" },
  xAxis: {
    width: "100%",
    height: "90px",
    textAlign: "center",
    paddingTop: "55px",
    whiteSpace: "nowrap",
  },
  xHeader: { color: gray, whiteSpace: "nowrap" },
  footer: {
    minWidth: "227px",
    height: "90px",
    textAlign: "center",
    paddingTop: "20px",
  },
  footerLabel: {},
  legend: {
    width: "100%",
    textAlign: "center",
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
  popupContent: {
    display: "flex",
    minHeight: "300px",
    height: `${document.documentElement.clientHeight - 100}px`,
    maxHeight: "500px",
  },
  popupClock: {
    flex: 0,
    height: "100px",
  },
  popupChart: {
    display: "inline-block",
    flex: "1 1 auto",
    width: "100%",
    height: "100%",
  },
  popupPrevious: {
    display: "flex",
    flex: 0,
    height: "100%",
    padding: "8px",
  },
  popupNext: {
    display: "flex",
    flex: 0,
    height: "100%",
    padding: "8px",
  },
  clockContent: { width: "min-content", background: white },
  chartContent: { display: "flex" },
  chartXAxis: {
    height: "40px",
    position: "absolute",
    width: "100%",
    bottom: "0px",
    textAlign: "center",
  },
  chartYAxis: {
    width: "40px",
    "& h5": {
      left: "-80px",
    },
  },
  chartFlex: {
    display: "flex",
  },
  chartPlot: {
    flex: 1,
  },
  noData: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: "-100px",
    marginTop: "-16px",
  },
});

export default styles;
