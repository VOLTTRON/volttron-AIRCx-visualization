import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
const mockItem = {
  time: "24",
  unit: "hr",
  label: "Fault",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
};

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

class Clock extends React.Component {
  state = {
    time: 0,
    sticky: null,
    selected: null,
  };

  componentDidMount() {
    this._timerId = setInterval(
      () => this.setState({ time: getSeconds() }),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this._timerId);
    this.setState({ timerId: false });
  }

  handleHover = (item) => {
    this.setState({ selected: item });
  };

  handleClick = (item) => {
    this.setState({ sticky: item });
  };

  render() {
    const { classes, data, size } = this.props;
    const { time, sticky, selected } = this.state;
    const seconds = time % 60;
    const item = selected ? selected : sticky;
    const domain = Math.max(0, size / 2 - 20);
    return (
      <div className={classes.clockContent}>
        <XYPlot
          margin={{ left: -10, right: 0, top: 0, bottom: 0 }}
          xDomain={[-domain, domain]}
          yDomain={[-domain, domain]}
          width={size}
          getAngle={(d) => d.time}
          getAngle0={() => 0}
          height={size}
          onMouseLeave={() => {
            this.handleHover();
          }}
        >
          <LineSeries color={gray} strokeWidth={2} data={ticks} />
          <LabelSeries
            style={{ fontSize: ".8rem" }}
            color={gray}
            labelAnchorX="middle"
            labelAnchorY="middle"
            data={labels}
          />
          <ArcSeries
            color={darker}
            radiusDomain={[0, domain]}
            data={[{ time: 2 * Math.PI, radius0: 0, radius: 25 }]}
          />
          {Boolean(item) && (
            <LabelSeries
              style={{ fontSize: "1rem" }}
              color={white}
              data={[
                {
                  style: { fill: white, fontSize: "1rem" },
                  x: 0,
                  y: 0,
                  label: item.time,
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
                  label: item.unit,
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
                  label: item.label.toLowerCase(),
                  yOffset: 16,
                },
              ]}
            />
          )}
          <ArcSeries
            color={light}
            radiusDomain={[0, domain]}
            data={[{ time: 2 * Math.PI, radius0: 25, radius: 35 }]}
          />
          <ArcSeries
            color={primary}
            radiusDomain={[0, domain]}
            data={[
              {
                time: (seconds / 60) * 2 * Math.PI,
                radius0: 25,
                radius: 35,
              },
            ]}
            onValueMouseOver={(item, event) => this.handleHover(mockItem)}
            onSeriesMouseOut={() => this.handleHover()}
            onValueClick={(item, event) => {
              this.handleClick(mockItem);
            }}
          />
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
