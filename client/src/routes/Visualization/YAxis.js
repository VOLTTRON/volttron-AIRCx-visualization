import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class YAxis extends React.Component {
  render() {
    const { classes, label, values } = this.props;
    return (
      <div className={classes.yAxis}>
        <div className={classes.days}>
          <Typography className={classes.yHeader} variant="h5">
            <strong>{label}</strong>
          </Typography>
          {Boolean(values) &&
            values.map((v) => (
              <Typography key={`day-${v}`} className={classes.day}>
                <strong>{v + 1}</strong>
              </Typography>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(YAxis));
