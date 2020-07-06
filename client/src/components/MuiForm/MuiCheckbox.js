import { Checkbox, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import styles from "./styles";

const MuiCheckbox = (props) => {
  const { classes, className, header, "aria-label": ariaLabel } = props;
  return (
    <ConditionalWrapper
      condition={Boolean(header)}
      wrapper={(c) => (
        <div>
          <Typography
            className={classes.header}
            style={{ display: "inline", paddingRight: "20px" }}
          >
            {header}
          </Typography>
          {c}
        </div>
      )}
    >
      <Checkbox
        color="primary"
        {..._.omit(props, ["classes", "className", "header", "aria-label"])}
        className={clsx(className, classes.checkbox)}
        aria-label={ariaLabel ? ariaLabel : header}
      />
    </ConditionalWrapper>
  );
};

export default withStyles(styles)(MuiCheckbox);
