import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import styles from "./styles";

const MuiSection = (props) => {
  const { children, classes, header } = props;

  return (
    <div className={classes.section}>
      {!_.isEmpty(header) ? (
        <Typography className={classes.title} variant="button">
          {header}
        </Typography>
      ) : null}
      {children}
    </div>
  );
};

MuiSection.propTypes = {};

export default withStyles(styles)(MuiSection);
