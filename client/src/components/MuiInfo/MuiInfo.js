import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Info as InfoIcon } from "@material-ui/icons";
import React from "react";
import styles from "./styles";

const MuiInfo = props => {
  return (
    <Tooltip title={props.title} placement="right-start">
      <InfoIcon className={props.classes.infoIcon} />
    </Tooltip>
  );
};

export default withStyles(styles)(MuiInfo);
