import { InputAdornment, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import MuiLabel from "./MuiLabel";
import styles from "./styles";

const MuiTextField = (props) => {
  const {
    classes,
    className,
    header,
    adornment,
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
      <TextField
        {..._.omit(props, [
          "classes",
          "className",
          "header",
          "placeholder",
          "adornment",
        ])}
        className={clsx(className, classes.textField)}
        aria-label={ariaLabel ? ariaLabel : header ? header : placeholder}
        size="small"
        variant="outlined"
        fullWidth
        placeholder={_.isEmpty(header) ? placeholder : undefined}
        InputProps={{
          endAdornment: adornment && (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ),
        }}
      />
    </ConditionalWrapper>
  );
};

MuiTextField.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  adornment: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  required: PropTypes.bool,
};

export default withStyles(styles)(MuiTextField);
