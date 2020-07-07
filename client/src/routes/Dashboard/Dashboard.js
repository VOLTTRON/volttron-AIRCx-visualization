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
import MuiLink from "components/MuiNavigation/MuiLink";
import filters from "constants/filters";
import groups from "constants/groups";
import { getMessage } from "constants/messages";
import { gray, lighter } from "constants/palette";
import sensitivities from "constants/sensitivities";
import {
  selectAggregated,
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
} from "controllers/data/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { ArcSeries, LabelSeries, MarkSeries, XYPlot } from "react-vis/dist";
import mixin from "utils/mixin";
import styles from "./styles";

class Dashboard extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { data } = props;
    const { tab } = state;
    if (data) {
      const tabs = Object.keys(data);
      if (!tabs.includes(tab)) {
        return { tab: tabs.length > 0 ? tabs[0] : "" };
      }
    }
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      tab: "",
      sticky: null,
      selected: null,
    };
    _.assign(this, mixin);
  }

  handleUpdate = (key) => () => {
    switch (key) {
      case "tab":
        this.setState({ sticky: null });
        break;
      default:
      // no need to handle all cases
    }
  };

  renderTabs() {
    const { classes, data } = this.props;
    const { tab } = this.state;
    return (
      <div className={classes.tabs}>
        <Tabs
          value={tab}
          onChange={this.handleChange("tab")}
          scrollButtons="auto"
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
        >
          {Object.keys(data).map((t, i) => {
            return (
              <Tab
                className={classes.tab}
                key={`tab-${t}`}
                value={t}
                label={_.replace(t, / Dx$/i, "")}
                wrapped={false}
              />
            );
          })}
        </Tabs>
      </div>
    );
  }

  renderCard(type) {
    const { classes, aggregated, form } = this.props;
    const { tab, sticky } = this.state;
    const domain = 100;
    const sensitivity = sensitivities.parse(
      _.get(form, "sensitivity", "normal")
    );
    const group = groups.parse(_.get(form, "group", "day"));
    const entries = Object.entries(
      _.get(aggregated, [tab, group.name, sensitivity.name, type.name], {})
    );
    const max = _.get(aggregated, [tab, group.name, "max"], entries.length);
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
                data={
                  entries.length > 0
                    ? [
                        {
                          time: ((2 * Math.PI) / max) * entries.length,
                          radius0: 80,
                          radius: 100,
                        },
                      ]
                    : []
                }
              />
              <MarkSeries
                color={type.color}
                data={
                  entries.length > 0
                    ? [
                        {
                          x: Math.sin(Math.PI) * 90,
                          y: Math.cos(Math.PI) * 90,
                          size: 10,
                        },
                        {
                          x:
                            Math.sin(
                              ((2 * Math.PI) / max) * entries.length + Math.PI
                            ) * 90,
                          y:
                            Math.cos(
                              ((2 * Math.PI) / max) * entries.length + Math.PI
                            ) * 90,
                          size: 10,
                        },
                      ]
                    : []
                }
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
                    label: `${entries.length}`,
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
                    label: `${group.increment}${
                      entries.length === 1 ? "" : "s"
                    }`,
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
                  {group.headers.map((h) => (
                    <TableCell
                      key={`header-${h}`}
                      className={classes.tableCell}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody
                onMouseOut={() => this.handleChange("selected")(null, null)}
              >
                {group
                  .groupEntries(
                    _.orderBy(entries, [(v) => group.binToDate(v[0])], ["desc"])
                  )
                  .map((e, i) => {
                    const [k, v] = e;
                    const t = _.concat(e, [tab, group.name, sensitivity.name]);
                    const selected = _.isEqual(t, sticky);
                    return (
                      <TableRow
                        className={classes.tableRow}
                        style={{
                          ...(selected && {
                            backgroundColor: type.color,
                          }),
                        }}
                        key={`table-row-${i}`}
                        onClick={() => this.handleChange("sticky")(null, t)}
                        onMouseOver={() =>
                          this.handleChange("selected")(null, t)
                        }
                        selected={selected}
                        hover
                      >
                        {group.values.map((value, j) => (
                          <TableCell
                            key={`value-${i}-${j}`}
                            className={classes.tableCell}
                          >
                            {value(k, v)}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }

  renderDetails() {
    const { classes, form, current } = this.props;
    const { sticky, tab } = this.state;
    const group = _.get(form, "group", "day");
    const sensitivity = _.get(form, "sensitivity", "normal");
    // this causes the selection to be lost and regained when the screen height changes
    // const item = selected ? selected : sticky;
    const item =
      sticky &&
      sticky[2] === tab &&
      sticky[3] === group &&
      sticky[4] === sensitivity
        ? sticky
        : null;
    const values = _.uniqBy(
      _.get(item, "1", [{}]).map((v) => ({
        type: _.get(filters.getType(v[sensitivity]), "single", "\u00A0"),
        message: v[sensitivity]
          ? getMessage(_.get(current, "diagnostic"), v[sensitivity])
          : "\u00A0",
      })),
      (v) => JSON.stringify(v)
    );
    return (
      <div className={classes.details}>
        <Typography variant="h6">{values[0].type}</Typography>
        {values.map((v, i) => (
          <Typography key={`details-message-${i}`}>{v.message}</Typography>
        ))}
      </div>
    );
  }

  render() {
    const { classes, data, busy, incomplete } = this.props;
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
    } else if (_.isEmpty(Object.keys(data))) {
      return (
        <div className={classes.container}>
          <Typography variant="h4" className={classes.message}>
            <strong>No data available for specified criteria.</strong>
          </Typography>
        </div>
      );
    } else if (incomplete) {
      return (
        <div className={classes.container} style={{ flexWrap: "wrap" }}>
          <Typography
            variant="h4"
            className={classes.message}
            style={{ width: "100%" }}
          >
            <strong>Under Construction</strong>
          </Typography>
          <MuiLink to="/visualization">
            <Typography variant="h6" className={classes.message}>
              Visualization View
            </Typography>
          </MuiLink>
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
  form: selectDataForm(state),
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
  aggregated: selectAggregated(state),
  current: selectDiagnosticsRequest(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Dashboard));
