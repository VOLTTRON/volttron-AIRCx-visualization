import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import {
  selectDiagnostics,
  selectDiagnosticsBusy,
} from "controllers/data/action";
import React from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import styles from "./styles";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

class Visualization extends React.Component {
  render() {
    const { classes, data, busy } = this.props;
    if (busy) {
      return (
        <div className={classes.container}>
          <MuiLoading />
        </div>
      );
    } else if (!data) {
      return (
        <div className={classes.container}>
          <Typography variant="h4" className={classes.message}>
            <strong>Specify device details to load data…</strong>
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.content}>
        <XAxis />
        <div className={classes.flex}>
          <YAxis />
          <Graph />
          <Graph />
          <Graph />
          <Graph />
          <Graph />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Visualization));
