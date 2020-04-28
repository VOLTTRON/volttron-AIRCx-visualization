import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { primary, white } from "constants/palette";
import {
  selectDiagnostics,
  selectDiagnosticsBusy,
} from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    const year = _.get(props, "year", moment().year());
    this.state = {
      year: year,
      base: _.range(12).reduce((a, m) => {
        const month = moment(`${year}-${m + 1}`);
        return a.concat(
          _.range(month.daysInMonth()).map((d) => {
            return {
              x: m + 1,
              y: d + 1,
              size: 10,
              color: primary,
            };
          })
        );
      }, []),
      temp: [],
    };
  }

  handleValueClick = (datapoint) => {
    console.log(`Datapoint clicked: ${JSON.stringify(datapoint)}`);
  };

  render() {
    const { year, base } = this.state;
    const { classes, data } = this.props;
    const marks = base.map((item) =>
      _.merge({}, item, _.find(data, { x: item.x, y: item.y }))
    );
    return (
      <Paper className={classes.paper} color={white} elevation={3}>
        <div className={classes.months}>
          {_.range(12).map((v) => (
            <span key={`month-${v}`} className={classes.month}>
              <strong>
                {moment(`${year}-${v + 1}`)
                  .format("MMM")
                  .slice(0, 1)}
              </strong>
            </span>
          ))}
        </div>
        <div className={classes.chart}>
          {marks.map((mark) => (
            <div
              key={`mark-${mark.x}-${mark.y}`}
              className={classes.mark}
              style={{
                left: mark.x * 19 - 18,
                top: mark.y * 21 - 19,
              }}
              onMouseDown={() => this.handleValueClick(mark)}
            />
          ))}
        </div>
        <div className={classes.footer}>
          <Typography className={classes.footerLabel} variant="body1">
            <strong>Economizer Outdoor Air Problems</strong>
          </Typography>
        </div>
      </Paper>
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
)(withStyles(styles)(Graph));
