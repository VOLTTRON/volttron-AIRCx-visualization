import { Paper } from "@material-ui/core";
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
import { CustomSVGSeries, XYPlot } from "react-vis";
import styles from "./styles";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    const year = _.get(props, "year", moment().year());
    this.state = {
      year: year,
      base: _.range(12).reduce((a, m) => {
        const month = moment(`${year}-${m + 1}`);
        // const abbr = month.format("MMM").slice(1);
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
    };
  }

  render() {
    const { year, base } = this.state;
    const { classes, data } = this.props;
    return (
      <Paper className={classes.graph} color={white} elevation={3}>
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
        <XYPlot
          width={227}
          height={648}
          yDomain={[31, 1]}
          margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
        >
          <CustomSVGSeries
            sizeRange={[1, 10]}
            style={{ fill: primary }}
            colorType="literal"
            customComponent="square"
            data={_.merge(base, data)}
          />
        </XYPlot>
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
