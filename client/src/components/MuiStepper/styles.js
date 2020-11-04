import { gray } from "constants/palette";

const styles = {
  toolbar: {
    flex: "1 0 auto",
    minHeight: 0,
  },
  stepper: {
    flex: "1 0 auto",
    background: "transparent",
  },
  disableGutters: {
    padding: 0,
  },
  stepLabel: {
    "& > span": {
      paddingRight: 0,
    },
  },
  compactToolbar: {
    alignItems: "flex-end",
  },
  select: {
    color: gray,
    width: "160px",
    marginLeft: "10px",
    marginRight: "10px",
  },
};

export default styles;
