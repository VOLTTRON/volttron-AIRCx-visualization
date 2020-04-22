import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import MuiLabel from "./MuiLabel";
import styles from "./styles";

const MuiTextArea = (props) => {
  const {
    classes,
    className,
    header,
    required,
    rows,
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
        {..._.omit(props, ["classes", "className", "placeholder", "header"])}
        className={clsx(className, classes.textArea)}
        aria-label={ariaLabel ? ariaLabel : header ? header : placeholder}
        size="medium"
        variant="outlined"
        fullWidth
        multiline
        rowsMax={rows}
        placeholder={_.isEmpty(header) ? placeholder : undefined}
      />
    </ConditionalWrapper>
  );
};

MuiTextArea.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};

export default withStyles(styles)(MuiTextArea);
