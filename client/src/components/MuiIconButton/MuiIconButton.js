import { IconButton, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import styles from "./styles";

/**
 * Abstracted NBIC Icon Button
 * disabled - boolean
 * onClick - function
 * @param {object} props
 */
const MuiIconButton = props => {
  const { classes, className, disabled, tooltip, children, color } = props;
  const classNames = clsx([
    className,
    !Boolean(color) && classes.default,
    disabled && "disabled"
  ]);
  const custom = _.isString(color) && color.startsWith("#");
  return (
    <ConditionalWrapper
      condition={Boolean(tooltip)}
      wrapper={c => (
        <Tooltip placement="bottom" title={tooltip}>
          {c}
        </Tooltip>
      )}
    >
      <IconButton
        {..._.omit(props, [
          "classes",
          "className",
          "header",
          "tooltip",
          "children",
          "color"
        ])}
        className={classNames}
        style={custom ? { color: color } : undefined}
        color={custom ? undefined : color}
        size="small"
        disableRipple
      >
        {children}
      </IconButton>
    </ConditionalWrapper>
  );
};

export default withStyles(styles)(MuiIconButton);
