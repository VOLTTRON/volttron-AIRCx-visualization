import { FormControl, Select, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { dark } from "constants/palette";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import MuiLabel from "./MuiLabel";
import styles from "./styles";

const renderValue = (props) => (value) => {
  const { classes, header, placeholder, multiple, renderValue } = props;
  if (_.isEmpty(value)) {
    if (!_.isEmpty(placeholder) && _.isEmpty(header)) {
      return (
        <div className={classes.value}>
          <Typography style={{ color: dark }}>{placeholder}</Typography>
        </div>
      );
    } else {
      return null;
    }
  } else if (multiple) {
    return (
      <div className={classes.value}>
        <Typography>
          {value.length > 0
            ? renderValue
              ? renderValue(value[0])
              : value[0]
            : ""}
        </Typography>
        <Typography>{value.length > 1 && `+${value.length - 1}`}</Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.value}>
        <Typography>{renderValue ? renderValue(value) : value}</Typography>
      </div>
    );
  }
};

const MuiSelect = (props) => {
  const {
    classes,
    className,
    disabled,
    header,
    placeholder,
    id,
    onChange,
    value,
    fullWidth,
    multiple,
    required,
    children,
    "aria-label": ariaLabel,
  } = props;

  return (
    <ConditionalWrapper
      condition={Boolean(header)}
      wrapper={(c) => (
        <div>
          <MuiLabel header={header} required={required} />
          {c}
        </div>
      )}
    >
      <FormControl
        className={clsx(fullWidth && classes.fullWidth)}
        variant="outlined"
        size="medium"
        margin="none"
        fullWidth
      >
        <Select
          id={id}
          className={clsx(className, classes.select)}
          aria-label={ariaLabel ? ariaLabel : header ? header : placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          displayEmpty
          multiple={multiple}
          renderValue={renderValue(props)}
          fullWidth
        >
          {children}
        </Select>
      </FormControl>
    </ConditionalWrapper>
  );
};

MuiSelect.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default withStyles(styles)(MuiSelect);
