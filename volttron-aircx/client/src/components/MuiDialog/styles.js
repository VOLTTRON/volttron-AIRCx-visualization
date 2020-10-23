import { primary, white } from "constants/palette";

const styles = {
  dialog: {
    "& > div > div": { background: white },
  },
  header: {
    display: "flex",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingRight: "8px",
    marginBottom: "4px",
  },
  title: {
    fontSize: "1.2rem",
    color: primary,
    lineHeight: "30px",
  },
  icon: {
    flex: 1,
    textAlign: "right",
  },
  form: {
    overflow: "hidden",
    padding: "0px",
  },
  content: {
    overflow: "hidden",
    padding: "0 24px 4px 24px",
  },
  footer: {
    padding: "8px",
    paddingBottom: "16px",
    paddingTop: "12px",
  },
  button: {
    marginLeft: "8px",
  },
};

export default styles;
