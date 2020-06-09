import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import filters from "constants/filters";
import { lighter, primary, white } from "constants/palette";
import {
  fetchDetailed,
  selectDetailed,
  selectDetailedBusy,
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
    const start = moment(props.start);
    const end = moment(props.end);
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
        color: pad.isBefore(start) ? lighter : primary,
        date: pad.isBefore(start) ? null : pad.clone(),
      });
      pad.add(1, "day");
      if (months[months.length - 1].month !== pad.month()) {
        months.push({
          name: pad.format("MMM"),
          label: pad.format("MMM").slice(0, 1),
          month: pad.month(),
          year: pad.year(),
        });
      }
    }
    const month = months[months.length - 1];
    base.push({
      path: [`${month.year}`, `${month.month}`, `${pad.date()}`],
      x: months.length,
      y: pad.date(),
      size: 10,
      color: pad.isBefore(start) ? lighter : primary,
      date: pad.clone(),
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
    const { form } = this.props;
    if (value.date) {
      this.setState({ show: value });
      this.props.fetchDetailed(
        _.merge({}, form, {
          start: value.date.format(),
          end: value.date
            .clone()
            .add("day", 1)
            .format(),
        })
      );
    }
  };

  handleValuePrevious = () => {
    const { form } = this.props;
    const { base, months, show } = this.state;
    if (this.isPrevious()) {
      const date = show.date.clone().subtract("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
      this.props.fetchDetailed(
        _.merge({}, form, {
          start: date.format(),
          end: date
            .clone()
            .add("day", 1)
            .format(),
        })
      );
    }
  };

  handleValueNext = () => {
    const { form } = this.props;
    const { base, months, show } = this.state;
    if (this.isNext()) {
      const date = show.date.clone().add("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
      this.props.fetchDetailed(
        _.merge({}, form, {
          start: date.format(),
          end: date
            .clone()
            .add("day", 1)
            .format(),
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
      <div className={classes.months} style={{ width: months.length * 19 }}>
        {months.map((m) => (
          <span key={`month-${m.year}-${m.month}`} className={classes.month}>
            <strong>{m.label}</strong>
          </span>
        ))}
      </div>
    );
  }

  renderChart() {
    const { classes, data, form } = this.props;
    const { base, months } = this.state;
    const filter = filters.parse(form.filter);
    const marks = base.map((item) => {
      const values = Object.values(_.get(data, item.path, {}))
        .reduce((p, v) => p.concat(v), [])
        .filter((v) => {
          const t = filter.isType(v.normal);
          return t;
        })
        .map((v) => ({
          filter: filters.getType(v.normal),
          value: v.normal,
        }));
      let temp = { color: primary, value: null };
      for (let index = 0; index < filters.values.length; index++) {
        const filter = filters.values[index];
        const value = _.find(values, { filter });
        if (value) {
          temp = { color: filter.color, value: value };
          break;
        }
      }
      return _.merge({}, item, temp);
    });
    return (
      <div className={classes.chart} style={{ width: months.length * 19 + 4 }}>
        {marks.map((mark) => (
          <div
            key={`mark-${mark.x}-${mark.y}`}
            className={clsx(classes.mark, Boolean(mark.date) && classes.hover)}
            style={{
              left: mark.x * 19 - 18,
              top: mark.y * 21 - 19,
              background: mark.color,
            }}
            onMouseDown={() => this.handleValueClick(mark)}
          />
        ))}
      </div>
    );
  }

  renderFooter() {
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

  render() {
    const { classes, form, data, detailed, busy } = this.props;
    const { show } = this.state;
    return (
      <Paper className={classes.paper} color={white} elevation={3}>
        {this.renderHeader()}
        {this.renderChart()}
        {this.renderFooter()}
        {show && (
          <Popup
            form={form}
            data={_.merge({}, show, {
              diagnostic: _.get(data, show.path, {}),
              detailed: detailed,
              busy: busy,
            })}
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
});

const mapActionToProps = { fetchDetailed };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Graph));
