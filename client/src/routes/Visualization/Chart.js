import { withStyles } from "@material-ui/core/styles";
import { black, gray, primary } from "constants/palette";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
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
    return (
      <div className={classes.chartContent}>
        <XYPlot
          // margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
          xDomain={[0, domain]}
          // yDomain={[0, domain]}
          width={width}
          height={height}
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
            color={primary}
            curve="curveMonotoneX"
            strokeWidth={8}
            data={mockDataSets[0]}
          />
          <LineSeries
            style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
            color={gray}
            curve="curveMonotoneX"
            strokeWidth={8}
            data={mockDataSets[1]}
          />
          <LineSeries
            style={{ strokeLinejoin: "round", strokeLinecap: "round" }}
            color={black}
            curve="curveMonotoneX"
            strokeWidth={8}
            data={mockDataSets[2]}
          />
        </XYPlot>
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
