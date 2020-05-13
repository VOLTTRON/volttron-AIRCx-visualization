import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { black, gray, primary } from "constants/palette";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  HorizontalGridLines,
  LabelSeries,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
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
    const padding = (max - min) / 25;
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
            <XYPlot
              margin={{ right: 30 }}
              xDomain={[0, domain]}
              yDomain={[min, max]}
              width={Math.max(0, width - 40)}
              height={Math.max(0, height - 40)}
              onMouseLeave={() => {
                this.handleHover();
              }}
            >
              <XAxis />
              <YAxis />
              <VerticalGridLines />
              <HorizontalGridLines />
              <LineSeries
                style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
                color={mockColors[0]}
                curve="curveMonotoneX"
                strokeWidth={8}
                data={mockDataSets[0]}
              />
              <LineSeries
                style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
                color={mockColors[1]}
                curve="curveMonotoneX"
                strokeWidth={8}
                data={mockDataSets[1]}
              />
              <LineSeries
                style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
                color={mockColors[2]}
                curve="curveMonotoneX"
                strokeWidth={8}
                data={mockDataSets[2]}
              />
              <LabelSeries
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  transform: "translate(55px, 12px)",
                }}
                labelAnchorX="middle"
                labelAnchorY="middle"
                data={labels.map((v, i) =>
                  _.merge({}, v, {
                    x: v.x,
                    style: { fill: mockColors[i] },
                  })
                )}
              />
            </XYPlot>
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
