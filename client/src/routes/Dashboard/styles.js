import { gray, white } from "constants/palette";

const styles = (theme) => ({
  container: {
    width: "100%",
    paddingLeft: "140px",
    paddingTop: "30px",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingLeft: "140px",
    paddingRight: "140px",
    paddingTop: "30px",
    paddingBottom: "60px",
  },
  message: {
    color: gray,
    textAlign: "center",
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
    padding: "20px",
    background: white,
  },
  horizontal: {
    width: "300px",
    height: "220px",
  },
  vertical: { width: "100%", display: "flex" },
  labelHorizontal: {
    height: "64px",
    overflow: "hidden",
  },
  labelVertical: {
    flex: 1,
    overflow: "hidden",
  },
  resultHorizontal: {
    color: white,
    margin: "10px",
  },
  resultVertical: {
    color: white,
  },
  boxHorizontal: {},
  boxVertical: {
    borderRadius: "10000px",
    width: "340px",
  },
});

export default styles;
