import MomentUtils from "@date-io/moment";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles";
import theme from "./theme";

class MuiTheme extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            {this.props.children}
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

MuiTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MuiTheme);
