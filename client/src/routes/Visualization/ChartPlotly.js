import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { createPadding } from "utils/layout";
import styles from "./styles";

const colors = [primary, verified, info, warning, error, "purple", gray, black];

class Chart extends React.Component {
  state = {
    sticky: null,
    selected: null,
  };

  handleHover = (item) => {
    this.setState({ selected: item });
  };

  handleClick = (item) => {
    this.setState({ sticky: item });
  };

  render() {
    const { classes, width, height, data, request } = this.props;
    const { start, end } = request ? request : {};
    const values = data
      ? _.concat(...Object.values(data)).map((v) => v[1])
      : [];
    const labels = data
      ? Object.keys(data).map((l, i) => ({
          i: i,
          x: data[l].length > 0 ? _.last(data[l])[0] : end,
          y: data[l].length > 0 ? _.last(data[l])[1] : 0,
          label: l.replace(/[a-z]+/g, ""),
          abbr: l.slice(0, 1),
        }))
      : [];
    const min = _.min(values) - 10;
    const max = _.max(values) + 10;
    const padding = (max - min) / 30;
    const ys = createPadding(
      labels.map((v) => v.y),
      min,
      max,
      padding
    );
    const items = data
      ? _.concat(
          Object.values(data).map((d, i) => {
            return {
              x: d.map((v) => v[0]),
              y: d.map((v) => v[1]),
              name: labels[i].label,
              type: "scatter",
              mode: "lines+markers",
              line: { shape: "spline", color: colors[i], width: 8 },
            };
          })
        )
      : [];
    return (
      <div className={classes.chartContent}>
        <div className={classes.chartFlex}>
          <div className={classes.chartYAxis}>
            <Typography className={classes.yHeader} variant="h5">
              <strong>Temperature ({"\xB0"}F)</strong>
            </Typography>
          </div>
          <div className={classes.chartPlot}>
            <Plot
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
                annotations: labels.map((v, i) => ({
                  x: v.x,
                  y: ys[i],
                  xanchor: "left",
                  yanchor: "center",
                  xshift: padding * 4,
                  text: `<b>${v.abbr}</b>`,
                  showarrow: false,
                  font: {
                    size: 16,
                    color: colors[i],
                  },
                })),
                xaxis: {
                  range: [start, end],
                  type: "date",
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
