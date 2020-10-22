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

import { withStyles } from "@material-ui/core/styles";
import { MuiStepper } from "components";
import { selectDataForm, setDataForm } from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import mixin from "utils/mixin";
import styles from "./styles";

class MuiDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    const start = moment(props.start);
    const end = moment(props.end);
    const temp = start.clone().endOf("day");
    const months = [
      {
        name: temp.format("MMM"),
        label: temp.format("MMM YYYY"),
        icon: `${temp.month() + 1}`,
        month: temp.month(),
        year: temp.year(),
      },
    ];
    const first = moment.max(
      temp
        .clone()
        .day(0)
        .startOf("day"),
      start.clone().startOf("day")
    );
    const last = moment.min(
      temp
        .clone()
        .day(6)
        .endOf("day"),
      end.clone().endOf("day")
    );
    const weeks = {
      [`${months[0].year}-${months[0].month}`]: [
        {
          name: `${temp.format("MMM D")} to ${last.format(
            temp.month() === last.month() ? "D" : "MMM D"
          )}`,
          icon: 1,
          start: {
            date: first,
            day: temp.date(),
            month: temp.month(),
            year: temp.year(),
          },
          end: {
            date: last,
            day: last.date(),
            month: last.month(),
            year: last.year(),
          },
        },
      ],
    };
    const days = {
      [`${months[0].year}-${months[0].month}`]: [
        {
          name: undefined,
          label: `${temp.date()}`,
          icon: `${temp.date()}`,
          day: temp.date(),
          month: temp.month(),
          year: temp.year(),
        },
      ],
    };
    while (temp.isBefore(end)) {
      temp.add(1, "day");
      const newMonth = months[months.length - 1].month !== temp.month();
      let key = `${months[months.length - 1].year}-${
        months[months.length - 1].month
      }`;
      if (newMonth) {
        months.push({
          name: temp.format("MMM"),
          label: temp.format("MMM YYYY"),
          icon: `${temp.month() + 1}`,
          month: temp.month(),
          year: temp.year(),
        });
        key = `${months[months.length - 1].year}-${
          months[months.length - 1].month
        }`;
        days[key] = [];
        weeks[key] = [];
      }
      if (temp.day() === 0) {
        const first = moment.max(
          temp
            .clone()
            .day(0)
            .startOf("day"),
          start.clone().startOf("day")
        );
        const last = moment.min(
          temp
            .clone()
            .day(6)
            .endOf("day"),
          end.clone().endOf("day")
        );
        weeks[key].push({
          name: `${first.format("MMM D")} to ${last.format(
            first.month() === last.month() ? "D" : "MMM D"
          )}`,
          label: `${first.format("MMM D")} to ${last.format(
            first.month() === last.month() ? "D" : "MMM D"
          )}`,
          icon: weeks[key].length + 1,
          start: {
            date: first,
            day: first.date(),
            month: first.month(),
            year: first.year(),
          },
          end: {
            date: last,
            day: last.date(),
            month: last.month(),
            year: last.year(),
          },
        });
      }
      days[key].push({
        name: undefined,
        label: `${temp.date()}`,
        icon: `${temp.date()}`,
        day: temp.date(),
        month: temp.month(),
        year: temp.year(),
      });
    }
    this.state = {
      start: moment(props.start),
      end: moment(props.end),
      months: months,
      weeks: weeks,
      days: days,
      index: months.length - 1,
    };
    _.assign(this, mixin);
  }

  handleUpdate = (key) => () => {
    switch (key) {
      default:
      // no need to handle all cases
    }
  };

  createKey = (date) => [`${date.year()}-${date.month()}`];

  handleMonthChange = (v) => {
    const { form } = this.props;
    const { months, weeks, days, index } = this.state;
    const group = _.get(form, "group", "month");
    const current = moment(_.get(form, "date", undefined));
    const month = months[v];
    const key = `${month.year}-${month.month}`;
    const week = weeks[key];
    const day = days[key][days[key].length - 1];
    let date;
    switch (group) {
      case "month":
        date = current
          .year(month.year)
          .month(month.month)
          .date(1)
          .format();
        break;
      case "week":
        const d =
          v < index
            ? _.get(week, [week.length - 1, "start", "day"], 1)
            : _.get(week, [0, "start", "day"], 1);
        date = current
          .year(month.year)
          .month(month.month)
          .date(d)
          .format();
        break;
      case "day":
        date = current
          .year(month.year)
          .month(month.month)
          .date(v < index ? day.day : 1)
          .format();
        break;
      default:
    }
    this.setState({ index: v });
    this.props.setDataForm(_.merge({}, form, { date }));
  };

  handleWeekChange = (v) => {
    const { form } = this.props;
    const { weeks } = this.state;
    const current = moment(_.get(form, "date", undefined));
    const key = this.createKey(current);
    const week = weeks[key][v];
    const date = week.start.date.format();
    this.props.setDataForm(_.merge({}, form, { date }));
  };

  handleDateChange = (v) => {
    const { form } = this.props;
    const { days } = this.state;
    const current = moment(_.get(form, "date", undefined));
    const key = this.createKey(current);
    const day = days[key][v];
    const date = current.date(day.day).format();
    this.props.setDataForm(_.merge({}, form, { date }));
  };

  render() {
    const { classes, form, variant } = this.props;
    const { months, weeks, days } = this.state;
    const group = _.get(form, "group", undefined);
    const date = moment(_.get(form, "date", undefined));
    const key = this.createKey(date);
    const monthIndex = _.findIndex(months, {
      year: date.year(),
      month: date.month(),
    });
    const week = weeks[key];
    const weekIndex = _.findIndex(
      week,
      (w) => date.isSameOrAfter(w.start.date) && date.isSameOrBefore(w.end.date)
    );
    const day = days[key];
    const dayIndex = _.findIndex(day, {
      day: date.date(),
    });
    return (
      <div className={classes.container}>
        <MuiStepper
          style={{ margin: "10px", flex: variant === "compact" ? 0 : 1 }}
          useIcon
          nonLinear
          disableGutters
          header="Month"
          variant={variant}
          step={monthIndex}
          steps={months}
          onStepChange={this.handleMonthChange}
        />
        {group === "week" && (
          <MuiStepper
            style={{ margin: "10px", flex: variant === "compact" ? 0 : 1 }}
            useIcon
            nonLinear
            disableGutters
            header="Week"
            variant={variant}
            step={weekIndex}
            steps={week}
            onStepChange={this.handleWeekChange}
            isStepBelow={monthIndex > 0}
            isStepAbove={monthIndex < months.length - 1}
            onStepBelow={() => this.handleMonthChange(monthIndex - 1)}
            onStepAbove={() => this.handleMonthChange(monthIndex + 1)}
          />
        )}
        {group === "day" && (
          <MuiStepper
            style={{ margin: "10px", flex: variant === "compact" ? 0 : 1 }}
            useIcon
            nonLinear
            disableGutters
            header="Day"
            variant={variant}
            step={dayIndex}
            steps={day}
            onStepChange={this.handleDateChange}
            isStepBelow={monthIndex > 0}
            isStepAbove={monthIndex < months.length - 1}
            onStepBelow={() => this.handleMonthChange(monthIndex - 1)}
            onStepAbove={() => this.handleMonthChange(monthIndex + 1)}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: selectDataForm(state),
});

const mapActionToProps = {
  setDataForm,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiDateRangePicker));
