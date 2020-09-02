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
import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { createPadding } from "utils/layout";
import styles from "./styles";

const colors = [primary, verified, info, warning, error, "purple", gray, black];

class Chart extends React.Component {
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

  render() {
    const { classes, width, height, data, request, form } = this.props;
    const { start, end } = request ? request : {};
    const sensitivity = _.get(form, "sensitivity", "normal");
    const diagnostic = _.get(data, "diagnostic");
    const detailed = _.get(data, "detailed");
    const values = detailed
      ? _.concat(...Object.values(detailed)).map((v) => v[1])
      : [];
    const labels = detailed
      ? Object.keys(detailed).map((l, i) => ({
          i: i,
          x: detailed[l].length > 0 ? _.last(detailed[l])[0] : end,
          y: detailed[l].length > 0 ? _.last(detailed[l])[1] : 0,
          label: l.replace(/([A-Z]+)/g, " $1").trim(),
          acronym: l.replace(/[a-z]+/g, "").trim(),
          abbr: l.trim().slice(0, 1),
          valid: detailed[l].length > 0,
        }))
      : [];
    const min = (!_.isEmpty(values) ? _.min(values) : 0) - 10;
    const max = (!_.isEmpty(values) ? _.max(values) : 0) + 10;
    const padding = (max - min) / 30;
    const ys = createPadding(
      labels.map((v) => v.y),
      min,
      max,
      padding
    );
    const items = detailed
      ? _.concat(
          Object.values(detailed).map((d, i) => {
            return {
              x: [_.get(d, ["0", "0"])],
              y: [_.get(d, ["0", "1"])],
              legendgroup: labels[i].acronym,
              showlegend: true,
              name: labels[i].acronym,
              type: "scatter",
              mode: "lines",
              line: { shape: "spline", color: colors[i], size: 3, width: 3 },
            };
          }),
          Object.values(detailed).map((d, i) => {
            return {
              x: d.map((v) => v[0]),
              y: d.map((v) => v[1]),
              legendgroup: labels[i].acronym,
              showlegend: false,
              name: labels[i].label,
              type: "scatter",
              mode: "lines",
              line: { shape: "spline", color: colors[i], size: 3, width: 3 },
            };
          })
        )
      : [];
    const ranges = Object.entries(diagnostic)
      .map(([k, v]) => {
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
    return (
      <div className={classes.chartContent}>
        <div className={classes.chartFlex}>
          <div className={classes.chartYAxis}>
            <Typography className={classes.yHeader} variant="h5">
              <strong>Temperature ({"\xB0"}F)</strong>
            </Typography>
          </div>
          <div className={classes.chartPlot} onMouseLeave={this.handleHover}>
            <Plot
              onHover={this.handleHover}
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
              data={items}
            />
            {detailed &&
              _.isEmpty(
                Object.values(detailed).reduce((a, v) => _.concat(a, v), [])
              ) && (
                <Typography className={classes.noData} variant="h5">
                  <strong>No Data Available</strong>
                </Typography>
              )}
          </div>
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

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Chart));
