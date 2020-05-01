import { Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { lighter, primary, white } from "constants/palette";
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
      base.push({
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
    base.push({
      x: months.length,
      y: pad.date(),
      size: 10,
      color: primary,
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
    if (value.date) {
      this.setState({ show: value });
    }
  };

  handleValuePrevious = () => {
    const { base, months, show } = this.state;
    if (this.isPrevious()) {
      const date = show.date.clone().subtract("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
    }
  };

  handleValueNext = () => {
    const { base, months, show } = this.state;
    if (this.isNext()) {
      const date = show.date.clone().add("day", 1);
      const mark = _.find(base, {
        x: _.findIndex(months, { month: date.month(), year: date.year() }) + 1,
        y: date.date(),
      });
      this.setState({ show: mark });
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
    const { classes, data } = this.props;
    const { base, months } = this.state;
    const marks = base.map((item) =>
      _.merge({}, item, _.find(data, { x: item.x, y: item.y }))
    );
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
    const { classes } = this.props;
    const { months } = this.state;
    return (
      <div className={classes.footer} style={{ width: months.length * 19 + 4 }}>
        <Typography className={classes.footerLabel} variant="body1">
          <strong>Economizer Outdoor Air Problems</strong>
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const { show } = this.state;
    return (
      <Paper className={classes.paper} color={white} elevation={3}>
        {this.renderHeader()}
        {this.renderChart()}
        {this.renderFooter()}
        {show && (
          <Popup
            data={show}
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

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Graph));
