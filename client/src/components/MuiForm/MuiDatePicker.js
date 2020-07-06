import { withStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import MuiLabel from "./MuiLabel";
import styles from "./styles";

const MuiDatePicker = (props) => {
  const {
    classes,
    className,
    header,
    required,
    placeholder,
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
      <KeyboardDatePicker
        {..._.omit(props, ["classes", "className", "header", "placeholder"])}
        className={clsx(className, classes.datePicker)}
        aria-label={ariaLabel ? ariaLabel : header ? header : placeholder}
        disableToolbar
        size="medium"
        variant="inline"
        inputVariant="outlined"
        margin="normal"
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        fullWidth
        placeholder={_.isEmpty(header) ? placeholder : undefined}
      />
    </ConditionalWrapper>
  );
};

MuiDatePicker.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default withStyles(styles)(MuiDatePicker);
