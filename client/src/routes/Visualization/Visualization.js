import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import {
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
} from "controllers/data/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Graph from "./Graph";
import Legend from "./Legend";
import styles from "./styles";
import YAxis from "./YAxis";

class Visualization extends React.Component {
  render() {
    const { classes, form, current, data, busy, incomplete } = this.props;
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
    } else if (_.isEmpty(Object.keys(data))) {
      return (
        <div className={classes.container}>
          <Typography variant="h4" className={classes.message}>
            <strong>No data available for specified criteria.</strong>
          </Typography>
        </div>
      );
    } else if (incomplete) {
      return (
        <div className={classes.container} style={{ flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            className={classes.message}
            style={{ width: "100%" }}
          >
            <strong>Under Construction</strong>
          </Typography>
          <MuiLink to="/dashboard">
            <Typography variant="h6" className={classes.message}>
              Dashboard View
            </Typography>
          </MuiLink>
        </div>
      );
    }
    const { start, end } = current ? current : {};
    return (
      <div className={classes.content}>
        {/* <XAxis label="Month" /> */}
        <Legend form={form} />
        <div className={classes.flex}>
          <YAxis label="Day" values={_.range(31)} />
          {Object.keys(data).map((k) => (
            <Graph
              key={`graph-${k}`}
              label={k}
              start={start}
              end={end}
              data={data[k]}
              form={form}
              current={current}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: selectDataForm(state),
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
  current: selectDiagnosticsRequest(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Visualization));
