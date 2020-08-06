import { white } from "constants/palette";

const styles = (theme) => ({
  container: {
    width: "100%",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingLeft: "140px",
    paddingRight: "140px",
    paddingTop: "60px",
    paddingBottom: "60px",
  },
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
  paper: {
    width: "300px",
    height: "320px",
    padding: "20px",
    background: white,
  },
});

export default styles;
