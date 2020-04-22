import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
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
          {this.props.children}
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

MuiTheme.propTypes = {
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(MuiTheme);
