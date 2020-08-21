import { Grid, Paper, Typography, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiDateRangePicker, MuiLoading } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import filters from "constants/filters";
import { white } from "constants/palette";
import {
  selectAggregated,
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
} from "controllers/data/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import mixin from "utils/mixin";
import styles from "./styles";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: null,
      selected: null,
      step: 0,
      sub: 0,
    };
    _.assign(this, mixin);
  }

  handleUpdate = (key) => () => {
    switch (key) {
      default:
      // no need to handle all cases
    }
  };

  getMinimum = () => {
    const { width } = this.props;
    switch (width) {
      case "xs":
        return 12;
      case "sm":
        return 6;
      case "md":
        return 4;
      case "lg":
        return 3;
      case "xl":
        return 2;
      default:
        return 4;
    }
  };

  getValues = () => {
    const min = this.getMinimum();
    return [12, 6, 4, 3, 2].filter((v) => v >= min);
  };

  getSize = (count) => {
    const values = this.getValues();
    return _.head(
      _.sortBy(
        values.map((v) => ({
          size: v,
          rows: Math.ceil(count / (12 / v)),
          extra: count % (12 / v),
        })),
        ["rows", "extra"]
      )
    ).size;
  };

  renderDatePicker() {
    const { classes, current } = this.props;
    return (
      <div className={classes.container}>
        <MuiDateRangePicker start={current.start} end={current.end} />
      </div>
    );
  }

  renderCards() {
    const { data, aggregated } = this.props;
    const keys = Object.keys(data);
    return (
      <React.Fragment>
        {keys.map((t) => {
          return (
            <Grid key={`grid-${t}`} item xs={this.getSize(keys.length)}>
              <Grid container justify="center" alignItems="center">
                {this.renderCard(
                  _.get(aggregated, t, {}),
                  _.replace(t, / Dx$/i, "")
                )}
              </Grid>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  renderCard(item, label) {
    const { classes, form } = this.props;
    const { group, sensitivity } = form ? form : {};
    const fault = filters.parse("fault");
    const okay = filters.parse("okay");
    const values = _.concat(
      ...Object.values(_.get(item, [group, sensitivity, "aggregate"], {}))
    );
    const result = filters.aggregate(
      values.filter((v) => fault.isType(_.get(v, sensitivity))).length,
      values.filter((v) => okay.isType(_.get(v, sensitivity))).length
    );
    return (
      <Paper className={classes.paper} elevation={3}>
        <Typography
          style={{ height: "64px", overflow: "hidden" }}
          variant="h6"
          align="center"
        >
          <strong>{label}</strong>
        </Typography>
        <Paper style={{ background: result.color }} elevation={1}>
          <Typography
            style={{ color: white, margin: "10px" }}
            variant="h6"
            align="center"
          >
            <strong>{result.single}</strong>
          </Typography>
        </Paper>
      </Paper>
    );
  }

  render() {
    const { classes, data, busy, incomplete } = this.props;
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
          <MuiLink to="/detailed">
            <Typography variant="h6" className={classes.message}>
              Detailed View
            </Typography>
          </MuiLink>
        </div>
      );
    }
    return (
      <div>
        {this.renderDatePicker()}
        <div className={classes.content}>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            alignContent="center"
            spacing={4}
          >
            {this.renderCards()}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: selectDataForm(state),
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
  aggregated: selectAggregated(state),
  current: selectDiagnosticsRequest(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(Dashboard)));
