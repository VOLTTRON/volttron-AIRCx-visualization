import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles";

const MuiLabel = (props) => {
  const { classes, header, required } = props;

  return (
    <Typography className={classes.header}>
      {header}
      {required ? (
        <React.Fragment>
          {" "}
          <span className={classes.required}>*</span>
        </React.Fragment>
      ) : null}
    </Typography>
  );
};

MuiLabel.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  required: PropTypes.bool,
};

export default withStyles(styles)(MuiLabel);
