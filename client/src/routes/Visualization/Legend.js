import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { faults, inconclusive, unitOff } from "constants/palette";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Legend extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.legend}>
        <div
          className={classes.legendMark}
          style={{ background: inconclusive }}
        />
        <Typography className={classes.legendLabel}>
          <strong>Inconclusive Only</strong>
        </Typography>
        <div className={classes.legendSpacer} />
        <div className={classes.legendMark} style={{ background: unitOff }} />
        <Typography className={classes.legendLabel}>
          <strong>Unit Off Only</strong>
        </Typography>
        <div className={classes.legendSpacer} />
        <div className={classes.legendMark} style={{ background: faults }} />
        <Typography className={classes.legendLabel}>
          <strong>Faults Only</strong>
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Legend));
