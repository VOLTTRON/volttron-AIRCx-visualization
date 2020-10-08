import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { white } from "constants/palette";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import Plot from "react-plotly.js";
import { connect } from "react-redux";
import styles from "./styles";

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

  renderScatter() {
    const { classes, width, height, data } = this.props;
    const {
      start,
      end,
      min,
      max,
      ys,
      padding,
      labels,
      colors,
      scatter,
      ranges,
      show,
    } = data;
    return (
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
    const { classes, width, height, data } = this.props;
    const { min, max, box, show } = data;
    return (
      <div className={classes.chartPlot} onMouseLeave={this.handleHover}>
        <Plot
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
  data: PropTypes.object.isRequired,
  request: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  filter: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Chart));
