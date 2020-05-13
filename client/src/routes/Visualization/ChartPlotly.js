import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { black, gray, primary, white } from "constants/palette";
import _ from "lodash";
import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import { createPadding } from "utils/layout";
import styles from "./styles";

const mockData = (median, variance) =>
  _.fill(_.range(0, 101, 5), median).map((v, i, a) => ({
    x: i * 5,
    y:
      Math.random() > 0.5
        ? Math.random() > 0.5
          ? a[Math.max(0, i - 1)] + Math.floor(Math.random() * variance)
          : a[Math.max(0, i - 1)] - Math.floor(Math.random() * variance)
        : a[Math.max(0, i - 1)],
  }));

const mockDataSets = [mockData(68, 4), mockData(70, 8), mockData(60, 20)];
const mockLabels = [
  {
    i: 0,
    x: _.last(mockDataSets[0]).x,
    y: _.last(mockDataSets[0]).y,
    label: "D",
  },
  {
    i: 1,
    x: _.last(mockDataSets[1]).x,
    y: _.last(mockDataSets[1]).y,
    label: "R",
  },
  {
    i: 2,
    x: _.last(mockDataSets[2]).x,
    y: _.last(mockDataSets[2]).y,
    label: "M",
  },
];
const mockColors = [primary, gray, black];

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
    const { classes, data, width, height } = this.props;
    const { sticky, selected } = this.state;
    const domain = 100;
    const values = _.concat(...mockDataSets).map((v) => v.y);
    const min = _.min(values) - 10;
    const max = _.max(values) + 10;
    const padding = (max - min) / 40;
    const ys = createPadding(
      mockLabels.map((v) => v.y),
      min,
      max,
      padding
    );
    const labels = mockLabels.map((v, i) => _.merge({}, v, { y: ys[i] }));
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
                  r: 40,
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
                annotations: mockLabels.map((v, i) => ({
                  x: v.x,
                  y: ys[i],
                  xanchor: "left",
                  yanchor: "center",
                  xshift: padding * 4,
                  text: `<b>${v.label}</b>`,
                  showarrow: false,
                  font: {
                    size: 16,
                    color: mockColors[i],
                  },
                })),
                plot_bgcolor: white,
                paper_bgcolor: white,
              }}
              config={{
                displaylogo: false,
              }}
              data={_.concat(
                mockDataSets.map((d, i) => ({
                  x: d.map((v) => v.x),
                  y: d.map((v) => v.y),
                  name: mockLabels[i].label,
                  type: "scatter",
                  mode: "lines+markers",
                  line: { shape: "spline", color: mockColors[i], width: 8 },
                }))
              )}
            />
          </div>
          <div className={classes.chartXAxis}>
            <Typography className={classes.xHeader} variant="h5">
              <strong>Time (min)</strong>
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
