import {
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import filters from "constants/filters";
import { gray, lighter } from "constants/palette";
import {
  selectDiagnostics,
  selectDiagnosticsBusy,
} from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { ArcSeries, LabelSeries, MarkSeries, XYPlot } from "react-vis/dist";
import mixin from "utils/mixin";
import styles from "./styles";

const tabs = [
  {
    label: "Insuficient Outdoor-Air Intake",
  },
  {
    label: "Excess Outdoor-Air Intake",
  },
  {
    label: "Economizing When Unit Should Not",
  },
  {
    label: "Not Economizing When Unit Should",
  },
  {
    label: "Temp Sensor",
  },
];

const mockData = _.range(24).map((v) => ({
  type: filters.values[Math.floor(Math.random() * Math.floor(3))].name,
  start: `2020-05-15T${`${v}`.padStart(2, "0")}:00`,
  end: `2020-05-15T${`${v + 1}`.padStart(2, "0")}:00`,
}));

const mockItem = {
  label: "Fault",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: tabs[0],
      sticky: null,
      selected: null,
    };
    _.assign(this, mixin);
  }

  handleUpdate = (key) => () => {};

  renderTabs() {
    const { classes } = this.props;
    const { tab } = this.state;
    return (
      <div className={classes.tabs}>
        <Tabs
          value={tab}
          onChange={this.handleChange("tab")}
          variant="fullWidth"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabs.map((t, i) => {
            return (
              <Tab
                className={classes.tab}
                key={`tab-${i}`}
                value={t}
                label={t.label}
                wrapped={false}
              />
            );
          })}
        </Tabs>
      </div>
    );
  }

  renderCard(type) {
    const { classes } = this.props;
    const { sticky } = this.state;
    const domain = 100;
    const data = mockData.filter((d) => filters.parse(d.type) === type);
    return (
      <div>
        <Paper className={classes.paperTop} elevation={3}>
          <Typography variant="h6">
            <strong>{type.alt}</strong>
          </Typography>
          <div className={classes.chartContent}>
            <XYPlot
              margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
              xDomain={[-domain, domain]}
              yDomain={[-domain, domain]}
              width={200}
              getAngle={(d) => d.time + Math.PI}
              getAngle0={() => Math.PI}
              height={200}
            >
              <ArcSeries
                color={lighter}
                radiusDomain={[0, domain]}
                data={[{ time: 2 * Math.PI, radius0: 85, radius: 95 }]}
              />
              <ArcSeries
                color={type.color}
                radiusDomain={[0, domain]}
                data={[
                  {
                    time: ((2 * Math.PI) / 24) * data.length,
                    radius0: 80,
                    radius: 100,
                  },
                ]}
              />
              <MarkSeries
                color={type.color}
                data={[
                  {
                    x: Math.sin(Math.PI) * 90,
                    y: Math.cos(Math.PI) * 90,
                    size: 10,
                  },
                  {
                    x:
                      Math.sin(((2 * Math.PI) / 24) * data.length + Math.PI) *
                      90,
                    y:
                      Math.cos(((2 * Math.PI) / 24) * data.length + Math.PI) *
                      90,
                    size: 10,
                  },
                ]}
              />
              <LabelSeries
                data={[
                  {
                    style: {
                      fontSize: "3rem",
                      fontWeight: "bold",
                      textAnchor: "middle",
                    },
                    x: 0,
                    y: 0,
                    label: `${data.length}`,
                    yOffset: 16,
                  },
                  {
                    style: {
                      fill: gray,
                      fontSize: "1rem",
                      textAnchor: "middle",
                    },
                    x: 0,
                    y: 0,
                    label: `Hour${data.length === 1 ? "" : "s"}`,
                    yOffset: 32,
                  },
                ]}
              />
            </XYPlot>
          </div>
        </Paper>
        <Paper className={classes.paperSub} elevation={2}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>Date</TableCell>
                  <TableCell className={classes.tableCell}>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                onMouseOut={() => this.handleChange("selected")(null, null)}
              >
                {data.map((d, i) => (
                  <TableRow
                    className={classes.tableRow}
                    style={{
                      ...(d === sticky && {
                        backgroundColor: type.color,
                      }),
                    }}
                    key={`table-row-${i}`}
                    onClick={() => this.handleChange("sticky")(null, d)}
                    onMouseOver={() => this.handleChange("selected")(null, d)}
                    selected={d === sticky}
                    hover
                  >
                    <TableCell className={classes.tableCell}>
                      {moment(d.start).format("M/D")}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{`${moment(
                      d.start
                    ).format("HH:mm")}-${moment(d.end).format(
                      "HH:mm"
                    )}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }

  renderDetails() {
    const { classes } = this.props;
    const { sticky, selected } = this.state;
    const item = selected ? selected : sticky;
    return (
      <div className={classes.details}>
        <Typography variant="h6">
          {item ? filters.parse(item.type).single : "\u00A0"}
        </Typography>
        <Typography>{item ? mockItem.message : "\u00A0"}</Typography>
      </div>
    );
  }

  render() {
    const { classes, data, busy } = this.props;
    if (busy) {
      return (
        <div className={classes.container}>
          <MuiLoading />
        </div>
      );
    } else if (!data) {
      return (
        <div className={classes.container}>
          <Typography variant="h4" className={classes.message}>
            <strong>Specify device details to load data…</strong>
          </Typography>
        </div>
      );
    }
    return (
      <div className={classes.content}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            {this.renderTabs()}
          </Grid>
          <Grid item xs={4}>
            <div className={classes.left}>
              {this.renderCard(filters.values[0])}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.middle}>
              {this.renderCard(filters.values[2])}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.right}>
              {this.renderCard(filters.values[1])}
            </div>
          </Grid>
          <Grid item xs={12}>
            {this.renderDetails()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Dashboard));
