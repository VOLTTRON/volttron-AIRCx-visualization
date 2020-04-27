import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import {
  selectDiagnostics,
  selectDiagnosticsBusy,
} from "controllers/data/action";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Dashboard extends React.Component {
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
      // <Grid container alignContent="center" justify="center" spacing={0}>
      //   <Grid item xs={12}>
      <div className={classes.container}>
        <Typography variant="h4" className={classes.message}>
          <strong>Dashboard goes here</strong>
        </Typography>
      </div>
      //   </Grid>
      // </Grid>
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
)(withStyles(styles)(Dashboard));
