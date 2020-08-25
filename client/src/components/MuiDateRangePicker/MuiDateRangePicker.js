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
    console.log({ v, group, current, month, key, day });
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
        date = current
          .year(month.year)
          .month(month.month)
          .date(v < index ? week[week.length - 1].start.day : week[0].start.day)
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
    const { classes, form } = this.props;
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
    console.log({ date, key, monthIndex, weekIndex, dayIndex });
    return (
      <div className={classes.container}>
        <MuiStepper
          style={{ margin: "10px" }}
          useIcon
          nonLinear
          disableGutters
          step={monthIndex}
          steps={months}
          onStepChange={this.handleMonthChange}
        />
        {group === "week" && (
          <MuiStepper
            style={{ margin: "10px" }}
            useIcon
            nonLinear
            disableGutters
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
            style={{ margin: "10px" }}
            useIcon
            nonLinear
            disableGutters
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
