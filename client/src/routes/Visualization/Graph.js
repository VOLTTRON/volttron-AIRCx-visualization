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

import { ButtonBase, Paper, Tooltip, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import filters from "constants/filters";
import groups from "constants/groups";
import { white } from "constants/palette";
import {
  fetchDetailed,
  selectDetailed,
  selectDetailedBusy,
  selectDetailedRequest,
  selectSources,
} from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import styles from "./styles";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    const { form } = props;
    const group = groups.parse(_.get(form, "group", "day"));
    const time = moment(_.get(form, "date"));
    const noData = filters.parse("no-data");
    const outsideRange = filters.parse("outside-range");
    const start = moment(props.start);
    const end = moment(props.end);
    const range = {
      start: start.clone(),
      end: end.clone(),
    };
    switch (group.name) {
      case "month":
        range.start = moment.max(
          range.start,
          time
            .clone()
            .startOf("month")
            .startOf("day")
        );
        range.end = moment.min(
          range.end,
          time
            .clone()
            .endOf("month")
            .endOf("day")
        );
        break;
      case "week":
        range.start = moment.max(
          range.start,
          time
            .clone()
            .startOf("week")
            .startOf("day")
        );
        range.end = moment.min(
          range.end,
          time
            .clone()
            .endOf("week")
            .endOf("day")
        );
        break;
      case "day":
        range.start = time.clone().startOf("day");
        range.end = time.clone().endOf("day");
        break;
      default:
      // no need to handle all cases
    }
    const pad = moment.min(
      end
        .clone()
        .date(1)
        .subtract(11, "month"),
      end
        .clone()
        .subtract(1, "year")
        .add(1, "day")
    );
    const months = [
      {
        name: pad.format("MMM"),
        label: pad.format("MMM").slice(0, 1),
        month: pad.month(),
        year: pad.year(),
        tooltip: pad.format("MMMM YYYY"),
      },
    ];
    const base = [];
    while (pad.isBefore(end)) {
      const month = months[months.length - 1];
      base.push({
        path: [`${month.year}`, `${month.month}`, `${pad.date()}`],
        x: months.length,
        y: pad.date(),
        size: 10,
        color: pad.isBefore(start) ? outsideRange.color : noData.color,
        date: pad.isBefore(start) ? null : pad.clone(),
        selected: pad.isBetween(range.start, range.end, "hour", true),
        tooltip: pad.format("MMMM Do YYYY"),
      });
      pad.add(1, "day");
      if (months[months.length - 1].month !== pad.month()) {
        months.push({
          name: pad.format("MMM"),
          label: pad.format("MMM").slice(0, 1),
          month: pad.month(),
          year: pad.year(),
          tooltip: pad.format("MMMM YYYY"),
        });
      }
    }
    const month = months[months.length - 1];
    base.push({
      path: [`${month.year}`, `${month.month}`, `${pad.date()}`],
      x: months.length,
      y: pad.date(),
      size: 10,
      color: pad.isBefore(start) ? outsideRange.color : noData.color,
      date: pad.clone(),
      selected: pad.isBetween(range.start, range.end, "hour", true),
      tooltip: pad.format("MMMM Do YYYY"),
    });
    this.state = {
      start: moment(props.start),
      end: moment(props.end),
      months: months,
      base: base,
      temp: [],
      show: null,
    };
  }

  isPrevious = () => {
    const { show, start } = this.state;
    if (show) {
      return !show.date.isSame(start, "day");
    }
  };

  isNext = () => {
    const { show, end } = this.state;
    if (show) {
      return !show.date.isSame(end, "day");
    }
  };

  handleValueClick = (value) => {
    const { current, sources } = this.props;
    if (value.date) {
      const { site, building, device, diagnostic } = current;
      const topic = Object.values(
        _.get(sources, [diagnostic, site, building, device], {})
      );
      this.setState({ show: value });
      this.props.fetchDetailed(
        _.merge({}, current, {
          start: value.date
            .clone()
            .startOf("day")
            .format(),
          end: value.date
            .clone()
            .endOf("day")
            .format(),
          topic: topic,
        })
      );
    }
  };

  handleValuePrevious = () => {
    const { current, sources } = this.props;
    const { base, months, show } = this.state;
    if (this.isPrevious()) {
      const { site, building, device, diagnostic } = current;
      const topic = Object.values(
        _.get(sources, [diagnostic, site, building, device], {})
      );
      const date = show.date.clone().subtract("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
      this.props.fetchDetailed(
        _.merge({}, current, {
          start: date
            .clone()
            .startOf("day")
            .format(),
          end: date
            .clone()
            .endOf("day")
            .format(),
          topic: topic,
        })
      );
    }
  };

  handleValueNext = () => {
    const { current, sources } = this.props;
    const { base, months, show } = this.state;
    if (this.isNext()) {
      const { site, building, device, diagnostic } = current;
      const topic = Object.values(
        _.get(sources, [diagnostic, site, building, device], {})
      );
      const date = show.date.clone().add("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
      this.props.fetchDetailed(
        _.merge({}, current, {
          start: date
            .clone()
            .startOf("day")
            .format(),
          end: date
            .clone()
            .endOf("day")
            .format(),
          topic: topic,
        })
      );
    }
  };

  handleClose = () => {
    this.setState({ show: null });
  };

  renderHeader() {
    const { classes } = this.props;
    const { months } = this.state;
    return (
      <React.Fragment>
        <div className={classes.monthsTitle}>
          <span className={classes.month}>
            <strong>Month</strong>
          </span>
        </div>
        <div className={classes.months} style={{ width: months.length * 19 }}>
          {months.map((m) => (
            <Tooltip
              key={`tooltip-${m.year}-${m.month}`}
              title={m.tooltip}
              placement="top"
            >
              <span
                key={`month-${m.year}-${m.month}`}
                className={classes.month}
              >
                <strong>{m.label}</strong>
              </span>
            </Tooltip>
          ))}
        </div>
      </React.Fragment>
    );
  }

  renderChart() {
    const { classes, data, form } = this.props;
    const { base, months } = this.state;
    const likely = filters.parse("likely");
    const sensitivity = _.get(form, "sensitivity", "normal");
    const filter = filters.parse(form.filter);
    const outsideRange = filters.parse("outside-range");
    const marks = base.map((item) => {
      let temp = {};
      if (item.color !== outsideRange.color) {
        const values = Object.values(_.get(data, item.path, {}))
          .reduce((p, v) => p.concat(v), [])
          .filter((v) => {
            const t = filter.isType(v[sensitivity]);
            return t;
          })
          .map((v) => ({
            filter: filters.getType(v[sensitivity]),
            value: v[sensitivity],
          }));
        if (filter === likely) {
          const errors = _.filter(values, { filter: filters.parse("fault") })
            .length;
          const passed = _.filter(values, { filter: filters.parse("okay") })
            .length;
          const aggregate = filters.aggregate(errors, passed);
          temp = { color: aggregate.color, value: 0 };
        } else {
          for (let index = 0; index < filters.values.length; index++) {
            const filter = filters.values[index];
            const value = _.find(values, { filter });
            if (value) {
              temp = { color: filter.color, value: value };
              break;
            }
          }
        }
      }
      return _.merge({}, item, temp);
    });
    return (
      <div className={classes.chart} style={{ width: months.length * 19 + 4 }}>
        {marks.map((mark, index) => (
          <React.Fragment key={`fragment-${mark.x}-${mark.y}`}>
            {mark.selected && (
              <div
                key={`selected-${mark.x}-${mark.y}`}
                className={classes.selected}
                style={{
                  left: mark.x * 19 - 20,
                  top: mark.y * 21 - 20,
                  height:
                    _.get(marks, [index + 1, "selected"], false) &&
                    _.get(marks, [index + 1, "path", "1"]) === mark.path[1]
                      ? "44px"
                      : "24px",
                }}
              />
            )}
            <Tooltip
              key={`tooltip-${mark.tooltip}`}
              title={mark.tooltip}
              placement="top"
            >
              <ButtonBase
                key={`mark-${mark.x}-${mark.y}`}
                className={clsx(
                  classes.mark,
                  Boolean(mark.date) && classes.hover
                )}
                style={{
                  left: mark.x * 19 - 14,
                  top: mark.y * 21 - 14,
                  background: mark.color,
                }}
                onClick={() => this.handleValueClick(mark)}
              />
            </Tooltip>
          </React.Fragment>
        ))}
      </div>
    );
  }

  renderTitle() {
    const { classes, label } = this.props;
    const { months } = this.state;
    return (
      <div className={classes.footer} style={{ width: months.length * 19 + 4 }}>
        <Typography className={classes.footerLabel} variant="body1">
          <strong>{_.replace(label, / Dx$/i, "")}</strong>
        </Typography>
      </div>
    );
  }

  renderFooter() {
    const { classes } = this.props;
    return <div className={classes.footer} style={{ height: "25px" }} />;
  }

  render() {
    const {
      classes,
      form,
      current,
      data,
      detailed,
      busy,
      request,
      label,
    } = this.props;
    const { show } = this.state;
    return (
      <Paper className={classes.paper} color={white} elevation={3}>
        {this.renderTitle()}
        {this.renderHeader()}
        {this.renderChart()}
        {this.renderFooter()}
        {show && (
          <Popup
            form={form}
            current={current}
            path={_.concat([label], show.path)}
            data={_.merge({}, show, {
              diagnostic: _.get(data, show.path, {}),
              detailed: detailed,
              busy: busy,
            })}
            request={request}
            onClose={this.handleClose}
            isNext={this.isNext()}
            isPrevious={this.isPrevious()}
            onNext={this.handleValueNext}
            onPrevious={this.handleValuePrevious}
          />
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  detailed: selectDetailed(state),
  busy: selectDetailedBusy(state),
  request: selectDetailedRequest(state),
  sources: selectSources(state),
});

const mapActionToProps = { fetchDetailed };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Graph));
