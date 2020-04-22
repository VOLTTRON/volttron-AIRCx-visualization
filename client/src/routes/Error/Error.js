import { SnackbarContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon
} from "@material-ui/icons";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import queryString from "query-string";
import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles";

const icons = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

class Error extends React.Component {
  state = {
    message: ""
  };

  static defaultProps = {
    variant: "error",
    label: `${process.env.REACT_APP_TITLE} has encountered an error.`
  };

  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    if (!_.isEmpty(query.message)) {
      this.setState({ message: query.message });
    }
  }

  render() {
    const { variant, label, classes } = this.props;
    const { message } = this.state;
    const Icon = icons[variant];
    return (
      <div className={clsx(classes.center, classes.pad)}>
        <SnackbarContent
          className={clsx(classes[variant], classes.snackbar)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {label}
              <br />
              {message}
            </span>
          }
        />
      </div>
    );
  }
}

Error.propTypes = {
  variant: PropTypes.oneOf(["success", "warning", "error", "info"])
};

export default withRouter(withStyles(styles)(Error));
