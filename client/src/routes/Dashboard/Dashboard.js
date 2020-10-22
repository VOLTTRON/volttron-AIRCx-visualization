// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

import { Grid, Paper, Typography, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { MuiDateRangePicker, MuiLoading } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import filters from "constants/filters";
import {
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
} from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
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
    const { orientation } = this.props;
    switch (orientation) {
      case "horizontal":
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
      case "vertical":
      default:
        return 12;
    }
  };

  renderDatePicker() {
    const { classes, current } = this.props;
    return (
      <div className={classes.container}>
        <MuiDateRangePicker
          variant="compact"
          start={current.start}
          end={current.end}
        />
      </div>
    );
  }

  renderCards() {
    const { data } = this.props;
    const keys = Object.keys(data);
    return (
      <React.Fragment>
        {keys.map((t) => {
          return (
            <Grid key={`grid-${t}`} item xs={this.getSize(keys.length)}>
              <Grid container justify="center" alignItems="center">
                {this.renderCard(_.get(data, t, {}), _.replace(t, / Dx$/i, ""))}
              </Grid>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  }

  renderCard(item, label) {
    const { classes, form } = this.props;
    const { group, sensitivity, date } = form ? form : {};
    const fault = filters.parse("fault");
    const okay = filters.parse("okay");
    const time = moment(date);
    let values = [];
    switch (group) {
      case "month":
        _.range(1, time.daysInMonth() + 1).forEach((day) => {
          values = _.concat(
            values,
            ...Object.values(_.get(item, [time.year(), time.month(), day], {}))
          );
        });
        break;
      case "week":
        _.range(0, 6).forEach((day) => {
          const temp = time.clone().day(day);
          values = _.concat(
            values,
            ...Object.values(
              _.get(item, [temp.year(), temp.month(), temp.date()], {})
            )
          );
        });
        break;
      case "day":
        values = _.concat(
          values,
          ...Object.values(
            _.get(item, [time.year(), time.month(), time.date()], {})
          )
        );
        break;
      default:
    }
    const result = filters.aggregate(
      values.filter((v) => fault.isType(_.get(v, sensitivity))).length,
      values.filter((v) => okay.isType(_.get(v, sensitivity))).length
    );
    const vertical = this.getSize() === 12;
    return (
      <Paper
        className={clsx(
          classes.paper,
          vertical ? classes.vertical : classes.horizontal
        )}
        elevation={3}
      >
        <Typography
          className={vertical ? classes.labelVertical : classes.labelHorizontal}
          variant="h6"
          align={vertical ? "left" : "center"}
        >
          <strong>{label}</strong>
        </Typography>
        <Paper
          className={vertical ? classes.boxVertical : classes.boxHorizontal}
          style={{ background: result.color }}
          elevation={1}
        >
          <Typography
            className={
              vertical ? classes.resultVertical : classes.resultHorizontal
            }
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
  current: selectDiagnosticsRequest(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(Dashboard)));
