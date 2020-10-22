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

import { Divider, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import filters from "constants/filters";
import { getMessage } from "constants/messages";
import { darker, gray, light, primary, white } from "constants/palette";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { ArcSeries, LabelSeries, LineSeries, XYPlot } from "react-vis";
import styles from "./styles";

const LABELS = ["Midnight", "3", "6a", "9", "Noon", "3", "6p", "9"];

const midnight = _.range(0, 1)
  .map((i) => {
    const a = -((2 * Math.PI) / 24) * i + Math.PI / 2;
    const r = i % 3 === 0 ? 47 : 39;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    return { x, y };
  })
  .reduce((p, v) => _.concat(p, [v, { x: 0, y: 0 }]), []);
const ticks = _.range(0, 24)
  .map((i) => {
    const a = -((2 * Math.PI) / 24) * i + Math.PI / 2;
    const r = i % 3 === 0 ? 47 : 39;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    return { x, y };
  })
  .reduce((p, v) => _.concat(p, [v, { x: 0, y: 0 }]), []);
const labels = _.range(0, 8).map((i) => {
  const a = -((2 * Math.PI) / 8) * i + Math.PI / 2;
  const r = 57;
  const x = r * Math.cos(a);
  const y = r * Math.sin(a);
  return { x, y, label: LABELS[i] };
});

class Clock extends React.Component {
  state = {
    time: 0,
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
    const { classes, form, current, data, size, hour } = this.props;
    const { selected } = this.state;
    const diagnostic = _.get(data, "diagnostic");
    const sensitivity = _.get(form, "sensitivity", "normal");
    const domain = Math.max(0, size / 2 - 20);
    const items = Object.entries(diagnostic)
      .map(([k, v]) => {
        const temp = { filters: [], messages: [] };
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
            const message = getMessage(
              _.get(current, "diagnostic"),
              value.value
            );
            temp.filters.push(filter);
            temp.messages.push(message);
          }
        });
        const filter = _.get(temp, ["filters", "0"]);
        const hr = parseInt(k);
        return {
          label: _.get(filter, ["single"], "Unk"),
          abbr: _.get(filter, ["abbr"], "Unk"),
          labels: temp.filters.map((f) => f.single),
          messages: temp.messages,
          hour: hr,
          time: 1,
          color: _.get(filter, ["color"], primary),
          angle0: ((hr + 1) / 24) * 2 * Math.PI - (1 / 24) * 2 * Math.PI,
          angle: ((hr + 1) / 24) * 2 * Math.PI,
          radius0: 25,
          radius: 35,
        };
      })
      .filter((v) => v);
    const prev = {
      label: items.length > 0 ? items[0].label : undefined,
      index: 0,
    };
    items.forEach((v, i) => {
      if (prev.label !== v.label || (i > 0 && v.hour - items[i - 1].hour > 1)) {
        _.range(prev.index, i)
          .map((i) => items[i])
          .forEach((v) => (v.time = i - prev.index));
        prev.label = v.label;
        prev.index = i;
      }
    });
    _.range(prev.index, items.length)
      .map((i) => items[i])
      .forEach((v) => (v.time = items.length - prev.index));
    const item = _.isNumber(hour) ? _.find(items, { hour }) : selected;
    // using sticky can cause confusion with what's being viewed
    // const item = selected ? selected : sticky;
    return (
      <div className={classes.clockContent}>
        <XYPlot
          margin={{ left: -10, right: 0, top: 0, bottom: 0 }}
          xDomain={[-domain, domain]}
          yDomain={[-domain, domain]}
          width={size}
          getAngle={(d) => d.angle}
          getAngle0={(d) => d.angle0}
          height={size}
          onMouseLeave={() => {
            this.handleHover();
          }}
        >
          <LineSeries color={gray} strokeWidth={2} data={ticks} />
          <LabelSeries
            style={{ fontSize: ".8rem" }}
            labelAnchorX="middle"
            labelAnchorY="middle"
            data={labels}
          />
          <ArcSeries
            color={light}
            radiusDomain={[0, domain]}
            data={[{ angle: 2 * Math.PI, angle0: 0, radius0: 25, radius: 35 }]}
          />
          {Boolean(diagnostic) ? (
            <ArcSeries
              colorType="literal"
              radiusDomain={[0, domain]}
              data={items}
              onValueMouseOver={(item, event) => this.handleHover(item)}
              onSeriesMouseOut={() => this.handleHover()}
              onValueClick={(item, event) => {
                this.handleClick(item);
              }}
            />
          ) : null}
          <LineSeries color={gray} strokeWidth={2} data={midnight} />
          <ArcSeries
            color={darker}
            radiusDomain={[0, domain]}
            data={[{ angle: 2 * Math.PI, angle0: 0, radius0: 0, radius: 25 }]}
          />
          {Boolean(item) && (
            <LabelSeries
              style={{ fill: white, fontSize: "1rem" }}
              data={[
                {
                  style: { fill: white, fontSize: "1rem" },
                  x: 0,
                  y: 0,
                  label: `${item.time}`,
                  xOffset: 0,
                },
                {
                  style: {
                    fill: white,
                    fontSize: ".8rem",
                    textAnchor: "start",
                  },
                  x: 0,
                  y: 0,
                  label: item.time === 1 ? "hr" : "hrs",
                  xOffset: 4,
                },
                {
                  style: {
                    fill: white,
                    fontSize: ".8rem",
                    textAnchor: "middle",
                  },
                  x: 0,
                  y: 0,
                  label: item.abbr.toLowerCase(),
                  yOffset: 16,
                },
              ]}
            />
          )}
        </XYPlot>
        {Boolean(item) &&
          _.range(0, Math.min(item.messages.length, item.labels.length))
            .map((i) => (
              <React.Fragment key={`message-frag-${i}`}>
                <Typography
                  key={`message-label-${i}`}
                >{`${item.labels[i]} Message: `}</Typography>
                <Typography
                  key={`message-text-${i}`}
                  style={{ fontSize: ".8em" }}
                >
                  {item.messages[i]}
                </Typography>
              </React.Fragment>
            ))
            .reduce(
              (c, v, i) =>
                _.concat(c, [
                  v,
                  i < Math.min(item.messages.length, item.labels.length) - 1 ? (
                    <Divider
                      key={`message-div-${i}`}
                      style={{ margin: "10px" }}
                    />
                  ) : null,
                ]),
              []
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Clock));
