import { Button, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import styles from "./styles";

/**
 * Abstracted NBIC Button
 * disabled - boolean
 * onClick - function
 * type - string [primary, submit, cancel]
 * @param {object} props
 */
const MuiButton = (props) => {
  const { classes, className, disabled, tooltip, type, width } = props;
  const classNames = clsx([
    className,
    classes.default,
    classes[type],
    width,
    disabled && "disabled",
  ]);
  return (
    <ConditionalWrapper
      condition={!(width === "xl" || !tooltip)}
      wrapper={(c) => (
        <Tooltip placement="bottom" title={tooltip}>
          {c}
        </Tooltip>
      )}
    >
      <Button
        {..._.omit(props, [
          "classes",
          "className",
          "header",
          "tooltip",
          "type",
          "width",
        ])}
        className={classNames}
      />
    </ConditionalWrapper>
  );
};

export default withStyles(styles)(MuiButton);
