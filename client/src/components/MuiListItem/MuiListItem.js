import { withStyles } from "@material-ui/core/styles";
import { ListItem } from "@material-ui/core";
import { selectedTint } from "constants/palette";

export default withStyles({
  root: {
    "&$selected": {
      backgroundColor: selectedTint,
      "&:hover": {
        backgroundColor: selectedTint
      }
    }
  },
  selected: {}
})(ListItem);
