import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import filters from "constants/filters";
import {
  black,
  error,
  gray,
  info,
  primary,
  verified,
  warning,
  white,
} from "constants/palette";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { createPadding } from "utils/layout";
import styles from "./styles";

const colors = [
  error,
  warning,
  info,
  verified,
  primary,
  "purple",
  "hotpink",
  gray,
  black,
  "lightcoral",
  "lightsalmon",
  "lightgreen",
  "lightskyblue",
  "mediumpurple",
];

const createScatterUpdate = (props, state) => {
  const { data, request } = props;
  const { labels } = state;
  const { topic } = request ? request : {};
  const conversion = _.get(topic, ["0", "conversion"], []);
  const detailed = _.get(data, ["detailed", "detailed"], {});
  const keys = Object.keys(detailed);
  const values = Object.values(detailed);
  const scatter = _.concat(
    values.map((d, i) => {
      return {
        x: [_.get(d, ["0", "0"])],
        y: [_.get(d, ["0", "1"])],
        legendgroup: labels[i].acronym,
        showlegend: true,
        hoverinfo: "skip",
        name: keys.length > 2 ? labels[i].acronym : labels[i].label,
        type: "scatter",
        mode: "lines",
        line: { shape: "spline", color: colors[i], size: 3, width: 3 },
      };
    }),
    values.map((d, i) => {
      const k = keys[i];
      const multiplier = conversion.includes(k) ? 10.0 : 1.0;
      return {
        x: d.map((v) => v[0]),
        y: d.map((v) => v[1] * multiplier),
        legendgroup: labels[i].acronym,
        showlegend: false,
        name: labels[i].label,
        type: "scatter",
        mode: "lines",
        line: { shape: "spline", color: colors[i], size: 3, width: 3 },
      };
    })
  );
  return { scatter };
};

const createBoxUpdate = (props, state) => {
  const { data, request, filter } = props;
  const { labels, offset } = state;
  const { topic } = request ? request : {};
  const conversion = _.get(topic, ["0", "conversion"], []);
  const subdevices = _.get(data, ["detailed", "subdevices"], {});
  const keys = Object.keys(subdevices);
  const values = Object.values(subdevices);
  const box = _.concat(
    ...values.map((d, i) => {
      const l = labels[offset + i];
      const c = colors[offset + i];
      return {
        x: l.acronym,
        y: [0],
        legendgroup: l.acronym,
        showlegend: true,
        hoverinfo: "skip",
        name: keys.length > 2 ? l.acronym : l.label,
        type: "scatter",
        mode: "lines",
        // visible: i > 0 ? "legendonly" : true,
        marker: {
          shape: "spline",
          color: c,
          size: 3,
          width: 3,
        },
      };
    }),
    ..._.range(0, 24).map((r) =>
      values.map((d, i) => {
        const k = keys[i];
        const l = labels[offset + i];
        const c = colors[offset + i];
        const multiplier = conversion.includes(k) ? 10.0 : 1.0;
        const ds = _.concat(
          ...Object.entries(d)
            .filter(([k, v]) => (filter ? !filter.includes(k) : true))
            .map(([k, v]) => v)
        );
        return {
          x: l.acronym,
          y: ds
            .filter((v) => {
              const h = moment(v[0]).hour();
              return r === 0 ? h === 0 || h === 24 : r === h;
            })
            .map((v) => v[1] * multiplier),
          legendgroup: l.acronym,
          showlegend: false,
          name: `${r}:00 - ${r}:59`,
          type: "box",
          boxmean: "sd",
          // visible: i > 0 ? "legendonly" : true,
          marker: { color: c },
        };
      })
    )
  );
  return { box };
};

const createRangesUpdate = (props, state) => {
  const { data, form } = props;
  const { start, min, max } = state;
  const sensitivity = _.get(form, "sensitivity", "normal");
  const diagnostic = _.get(data, "diagnostic", {});
  const keys = Object.keys(diagnostic);
  const values = Object.values(diagnostic);
  const ranges = values
    .map((v, i) => {
      const k = keys[i];
      const temp = { filters: [] };
      const values = v
        .map((i) => ({
          filter: filters.getType(i[sensitivity]),
          value: i[sensitivity],
        }))
        .filter((i) => i.filter);
      if (values.length === 0) {
        return null;
      }
      filters.values.forEach((filter) => {
        const value = _.find(values, { filter });
        if (value) {
          temp.filters.push(filter);
          return;
        }
      });
      const filter = _.get(temp, ["filters", "0"]);
      return {
        type: "rect",
        xref: "x",
        yref: "y",
        x0: moment(start)
          .hour(parseInt(k))
          .format(),
        y0: min,
        x1: moment(start)
          .hour(parseInt(k))
          .add(1, "hour")
          .format(),
        y1: max,
        fillcolor: _.get(filter, ["color"], primary),
        opacity: 0.2,
        line: {
          width: 0,
        },
      };
    })
    .filter((v) => v);
  return { ranges };
};

class Chart extends React.Component {
  // static getDerivedStateFromProps(props, state) {
  //   switch (type) {
  //     case "secondary":
  //       return createBoxUpdate(props, state);
  //     default:
  //       return {};
  //   }
  // }

  constructor(props) {
    super(props);
    const { data, request, type } = props;
    const { start, end } = request ? request : {};
    const detailed = _.get(data, ["detailed", "detailed"], {});
    const subdevices = _.get(data, ["detailed", "subdevices"], {});
    const keys = {
      detailed: Object.keys(detailed),
      subdevices: Object.keys(subdevices),
    };
    const offset = keys.detailed.length;
    const values = _.concat(
      _.concat(...Object.values(detailed)).map((v) => v[1]),
      _.concat(
        ...Object.values(subdevices).map((v) => _.concat(...Object.values(v)))
      ).map((v) => v[1])
    );
    const labels = _.concat(keys.detailed, keys.subdevices).map((l, i) => {
      const y =
        i < keys.detailed.length
          ? _.get(detailed[l].slice(-1).pop(), "1", 0)
          : 0;
      const v = i < keys.detailed.length ? detailed[l].length > 0 : false;
      return {
        i: i,
        x: end,
        y: y,
        label: l.replace(/([A-Z]+)/g, " $1").trim(),
        acronym: l.replace(/[a-z]+/g, "").trim(),
        abbr: l.trim().slice(0, 1),
        valid: v,
      };
    });
    const show = !_.isEmpty(values);
    const min = (show ? _.min(values) : 0) - 10;
    const max = (show ? _.max(values) : 0) + 10;
    const padding = (max - min) / 30;
    const ys = createPadding(
      labels.map((v) => v.y),
      min,
      max,
      padding
    );
    this.state = {
      start,
      end,
      min,
      max,
      ys,
      padding,
      labels,
      offset,
      show,
    };
    switch (type) {
      case "primary":
        _.merge(this.state, createScatterUpdate(props, this.state));
        _.merge(this.state, createRangesUpdate(props, this.state));
        break;
      case "secondary":
        _.merge(this.state, createBoxUpdate(props, this.state));
        break;
      default:
    }
  }

  handleHover = (event) => {
    const { request } = this.props;
    const time = moment(_.get(request, "time"));
    const ms = _.get(event, ["xvals", 0]);
    if (ms > 0) {
      const hour = moment(ms)
        .utcOffset(time.utcOffset())
        .utc()
        .hour();
      this.props.onHover({ hour: hour });
    } else {
      this.props.onHover({ hour: undefined });
    }
  };

  // handleClick = (event) => {
  //   const { labels } = this.state;
  //   const t = _.get(event, ["node", "textContent"]);
  //   const l = _.find(labels, (l) => l.acronym === t || l.label === t);
  //   console.log(l);
  // };

  renderScatter() {
    const { classes, width, height } = this.props;
    const {
      start,
      end,
      min,
      max,
      ys,
      padding,
      labels,
      scatter,
      ranges,
      show,
    } = this.state;
    return (
      <div className={classes.chartPlot} onMouseLeave={this.handleHover}>
        <Plot
          onHover={this.handleHover}
          // onLegendClick={this.handleClick}
          layout={{
            width: width,
            height: height,
            title: "",
            margin: {
              autoexpand: false,
              t: 20,
              r: 60,
              b: 64,
              l: 20,
            },
            showlegend: true,
            legend: {
              x: 0,
              y: 1,
              xanchor: "left",
              yanchor: "bottom",
              orientation: "h",
            },
            annotations: labels
              .filter((l) => l.valid)
              .map((v, i) => ({
                x: v.x,
                y: ys[i],
                xanchor: "left",
                yanchor: "center",
                xshift: padding,
                text: `<b>${v.abbr}</b>`,
                showarrow: false,
                font: {
                  size: 16,
                  color: colors[i],
                },
              })),
            shapes: ranges,
            xaxis: {
              range: [start, end],
              type: "date",
              tickvals: _.range(0, 24 / 3).map((v) =>
                moment(start)
                  .add(v * 3, "hours")
                  .format()
              ),
              ticktext: _.range(0, 24 / 3).map((v, i) =>
                i > 0 && i < 24 / 3
                  ? moment(start)
                      .add(v * 3, "hours")
                      .format("HH:mm")
                  : ""
              ),
            },
            yaxis: {
              range: [min, max],
            },
            plot_bgcolor: white,
            paper_bgcolor: white,
          }}
          config={{
            displaylogo: false,
          }}
          data={scatter}
        />
        {!show && (
          <Typography className={classes.noData} variant="h5">
            <strong>No Data Available</strong>
          </Typography>
        )}
      </div>
    );
  }

  renderBox() {
    const { classes, width, height } = this.props;
    const { min, max, box, show } = this.state;
    return (
      <div className={classes.chartPlot} onMouseLeave={this.handleHover}>
        <Plot
          // onLegendClick={this.handleClick}
          layout={{
            width: width,
            height: height,
            title: "",
            margin: {
              autoexpand: false,
              t: 20,
              r: 60,
              b: 104,
              l: 20,
            },
            showlegend: true,
            legend: {
              x: 0,
              y: 1,
              xanchor: "left",
              yanchor: "bottom",
              orientation: "h",
            },
            xaxis: {
              showgrid: false,
              zeroline: false,
              // showticklabels: false,
            },
            yaxis: {
              range: [min, max],
            },
            plot_bgcolor: white,
            paper_bgcolor: white,
          }}
          config={{
            displaylogo: false,
          }}
          data={box}
        />
        {!show && (
          <Typography className={classes.noData} variant="h5">
            <strong>No Data Available</strong>
          </Typography>
        )}
      </div>
    );
  }

  render() {
    const { classes, type } = this.props;
    return (
      <div className={classes.chartContent}>
        <div className={classes.chartFlex}>
          <div className={classes.chartYAxis}>
            <Typography className={classes.yHeader} variant="h5">
              <strong>Temperature ({"\xB0"}F)</strong>
            </Typography>
          </div>
          {type === "primary" && this.renderScatter()}
          {type === "secondary" && this.renderBox()}
          <div className={classes.chartXAxis}>
            <Typography className={classes.xHeader} variant="h5">
              <strong>Time</strong>
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  filter: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Chart));
