import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class XAxis extends React.Component {
  render() {
    const { classes, label } = this.props;
    return (
      <div className={classes.xAxis}>
        <Typography className={classes.xHeader} variant="h5">
          <strong>{label}</strong>
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
)(withStyles(styles)(XAxis));
