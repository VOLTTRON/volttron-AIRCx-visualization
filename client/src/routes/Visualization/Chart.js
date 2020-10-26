// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.
// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:
//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.
//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.
//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.
// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.
// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.
// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.
// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.
// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830
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
      pmin,
      pmax,
      pshow,
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
            ...(!pshow && {
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
            }),
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
            ...(pshow && {
              yaxis2: {
                overlaying: "y",
                side: "right",
                range: [pmin, pmax],
              },
            }),
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
