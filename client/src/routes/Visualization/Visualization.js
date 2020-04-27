import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Visualization extends React.Component {
  render() {
    const { classes, data, busy } = this.props;
    if (!data) {
      if (busy) {
        return (
          <div className={classes.container}>
            <MuiLoading />
          </div>
        );
      } else {
        return (
          <div className={classes.container}>
            <Typography variant="h4" className={classes.message}>
              <strong>Specify device details to load data…</strong>
            </Typography>
          </div>
        );
      }
    }
    return (
      <Grid container alignContent="center" justify="center" spacing={0}>
        <Grid item xs={12}>
          <div className={classes.container}>
            <Typography variant="h4" className={classes.message}>
              <strong>Visualization goes here</strong>
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Visualization));
