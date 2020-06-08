import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import {
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
} from "controllers/data/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import Legend from "./Legend";
import styles from "./styles";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

class Visualization extends React.Component {
  render() {
    const { classes, form, data, busy } = this.props;
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
    const { start, end } = form ? form : {};
    return (
      <div className={classes.content}>
        <XAxis label="Month" />
        <div className={classes.flex}>
          <YAxis label="Day" values={_.range(31)} />
          {Object.keys(data).map((k) => (
            <Graph
              label={k}
              start={start}
              end={end}
              data={data[k]}
              form={form}
            />
          ))}
        </div>
        <Legend />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: selectDataForm(state),
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Visualization));
