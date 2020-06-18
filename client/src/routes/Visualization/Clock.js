import { Typography } from "@material-ui/core";
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
    const { classes, form, data, size } = this.props;
    const { sticky, selected } = this.state;
    const sensitivity = _.get(form, "sensitivity", "normal");
    const item = selected ? selected : sticky;
    const domain = Math.max(0, size / 2 - 20);
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
          <ArcSeries
            color={light}
            radiusDomain={[0, domain]}
            data={[{ angle: 2 * Math.PI, angle0: 0, radius0: 25, radius: 35 }]}
          />
          {Boolean(data) ? (
            <ArcSeries
              colorType="literal"
              radiusDomain={[0, domain]}
              data={Object.entries(data)
                .map(([k, v]) => {
                  let temp = { filter: null, message: null };
                  const values = v
                    .map((i) => ({
                      filter: filters.getType(i[sensitivity]),
                      value: i[sensitivity],
                    }))
                    .filter((i) => i.filter);
                  if (values.length === 0) {
                    return null;
                  }
                  for (let index = 0; index < filters.values.length; index++) {
                    const filter = filters.values[index];
                    const value = _.find(values, { filter });
                    if (value) {
                      const message = getMessage(form.diagnostic, value.value);
                      temp = {
                        filter: filter,
                        message: message,
                      };
                      break;
                    }
                  }
                  return {
                    label: _.get(temp, ["filter", "single"], "Unk"),
                    abbr: _.get(temp, ["filter", "abbr"], "Unk"),
                    message: _.get(temp, "message", ""),
                    time: 1,
                    color: _.get(temp, ["filter", "color"], primary),
                    angle0:
                      (parseInt(k) / 24) * 2 * Math.PI - (1 / 24) * 2 * Math.PI,
                    angle: (parseInt(k) / 24) * 2 * Math.PI,
                    radius0: 25,
                    radius: 35,
                  };
                })
                .filter((v) => v)}
              onValueMouseOver={(item, event) => this.handleHover(item)}
              onSeriesMouseOut={() => this.handleHover()}
              onValueClick={(item, event) => {
                this.handleClick(item);
              }}
            />
          ) : null}
        </XYPlot>
        {Boolean(item) && (
          <React.Fragment>
            <Typography>{`${item.label} Message: `}</Typography>
            <Typography style={{ fontSize: ".8em" }}>{item.message}</Typography>
          </React.Fragment>
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
