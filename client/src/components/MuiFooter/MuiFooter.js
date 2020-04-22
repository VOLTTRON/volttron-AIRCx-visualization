import { AppBar, Snackbar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { MuiIconButton } from "components";
import { warningTint } from "constants/palette";
import { clearError, selectErrorTokens } from "controllers/error/action";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class MuiFooter extends React.Component {
  handleClear = key => () => {
    this.props.clearError(key);
  };

  render() {
    const { classes, errors } = this.props;
    const key =
      errors &&
      Object.keys(errors)
        .filter(k => !errors[k].cleared)
        .sort((a, b) => errors[a].timestamp - errors[b].timestamp)
        .find(() => true);
    const token = errors && key && errors[key];
    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={classes.root} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          ContentProps={{ style: { background: warningTint } }}
          open={token !== null && token !== undefined}
          autoHideDuration={Math.min(
            Math.max(
              (token && token.error ? token.error.length : 0) * 50,
              3000
            ),
            8000
          )}
          onClose={this.handleClear(key)}
          message={token && token.error}
          action={
            <React.Fragment>
              <MuiIconButton color="inherit" onClick={this.handleClear(key)}>
                <CloseIcon fontSize="small" />
              </MuiIconButton>
            </React.Fragment>
          }
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: selectErrorTokens(state)
});

const mapActionToProps = {
  clearError
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiFooter));
