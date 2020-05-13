import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { MuiButton } from "components";
import MuiIconButton from "components/MuiIconButton";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles";

class MuiDialog extends React.Component {
  static defaultProps = {
    open: false,
  };

  handleClick = (button) => () => {
    if (button.onClick != null) {
      button.onClick();
    }
  };

  render() {
    const {
      classes,
      title,
      children,
      buttons,
      open,
      busy,
      maxWidth,
      disablePadding,
    } = this.props;
    return (
      <Dialog
        className={classes.dialog}
        fullWidth={true}
        maxWidth={maxWidth ? maxWidth : "xs"}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          disableTypography
          className={classes.header}
          id="form-dialog-title"
        >
          <Typography className={classes.title}>
            <strong>{title}</strong>
          </Typography>
          <div className={classes.icon}>
            {Boolean(this.props.onClose) ? (
              <MuiIconButton aria-label="Close" onClick={this.props.onClose}>
                <CloseIcon />
              </MuiIconButton>
            ) : null}
          </div>
        </DialogTitle>
        <DialogContent
          className={disablePadding ? classes.form : classes.content}
        >
          {children}
        </DialogContent>
        <DialogActions className={classes.footer}>
          {busy ? <CircularProgress /> : null}
          {buttons &&
            buttons.map((button) => (
              <div
                key={`dialog-div-${button.label}`}
                className={classes.button}
              >
                <MuiButton
                  key={`dialog-button-${button.label}`}
                  color="primary"
                  form={button.form}
                  onClick={this.handleClick(button)}
                  disabled={button.disabled}
                  type={button.type}
                >
                  {button.label}
                </MuiButton>
              </div>
            ))}
        </DialogActions>
      </Dialog>
    );
  }
}

MuiDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object.isRequired),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string,
  disablePadding: PropTypes.bool,
};

export default withStyles(styles)(MuiDialog);
