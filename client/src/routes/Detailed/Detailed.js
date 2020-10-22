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
import clsx from "clsx";
import { MuiDateRangePicker, MuiLoading } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import filters from "constants/filters";
import groups from "constants/groups";
import { getMessage } from "constants/messages";
import { gray, lighter } from "constants/palette";
import sensitivities from "constants/sensitivities";
import {
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
} from "controllers/data/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { ArcSeries, LabelSeries, MarkSeries, XYPlot } from "react-vis/dist";
import mixin from "utils/mixin";
import styles from "./styles";

class Detailed extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const { data } = props;
    const { tab } = state;
    if (data) {
      const tabs = Object.keys(data);
      if (!tabs.includes(tab)) {
        return { tab: tabs.length > 0 ? tabs[0] : "" };
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

  renderDatePicker() {
    const { classes, current } = this.props;
    return (
      <div className={clsx(classes.container, classes.picker)}>
        <MuiDateRangePicker
          variant="compact"
          start={current.start}
          end={current.end}
        />
      </div>
    );
  }

  renderTabs() {
    const { classes, data } = this.props;
    const { tab } = this.state;
    return (
      <Paper className={classes.paperTabs} elevation={3}>
        <Tabs
          value={tab}
          onChange={this.handleChange("tab")}
          orientation="vertical"
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
      </Paper>
    );
  }

  renderCard(type) {
    const { classes, data, form, current } = this.props;
    const { tab, sticky } = this.state;
    const domain = 100;
    const sensitivity = sensitivities.parse(
      _.get(form, "sensitivity", "normal")
    );
    const group = groups.parse(_.get(form, "group", "day"));
    const time = moment(_.get(form, "date"));
    const item = _.get(data, tab, {});
    let values = [];
    let max = 0;
    switch (group.name) {
      case "month":
        _.range(1, time.daysInMonth() + 1).forEach((day) => {
          values = _.concat(
            values,
            ...Object.values(_.get(item, [time.year(), time.month(), day], {}))
          );
        });
        max = Math.ceil(
          moment
            .min(
              time.clone().date(time.daysInMonth()),
              moment(_.get(current, "end"))
            )
            .diff(
              moment.max(time.clone().date(1), moment(_.get(current, "start"))),
              group.increment
            )
        );
        break;
      case "week":
        _.range(0, 7).forEach((day) => {
          const temp = time.clone().day(day);
          values = _.concat(
            values,
            ...Object.values(
              _.get(item, [temp.year(), temp.month(), temp.date()], {})
            )
          );
        });
        max = Math.ceil(
          moment
            .min(time.clone().day(6), moment(_.get(current, "end")))
            .diff(
              moment.max(time.clone().day(0), moment(_.get(current, "start"))),
              group.increment
            )
        );
        break;
      case "day":
        values = _.concat(
          values,
          ...Object.values(
            _.get(item, [time.year(), time.month(), time.date()], {})
          )
        );
        max = 24;
        break;
      default:
    }
    const bins = {};
    values.forEach((v) => {
      if (type.isType(_.get(v, sensitivity.name))) {
        const bin = group.buildBin(v.timestamp);
        _.set(bins, bin, _.concat(_.get(bins, bin, []), [v]));
      }
    });
    const entries = Object.entries(bins);
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
      <div className={classes.flex}>
        {this.renderDatePicker()}
        {/* <div className={classes.tabs}>{this.renderTabs()}</div> */}
        <div className={classes.content}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <div className={classes.left}>{this.renderTabs()}</div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.left}>
                {this.renderCard(filters.values[0])}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.middle}>
                {this.renderCard(filters.values[2])}
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.right}>
                {this.renderCard(filters.values[1])}
              </div>
            </Grid>
            <Grid item xs={12}>
              {this.renderDetails()}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  form: selectDataForm(state),
  data: selectDiagnostics(state),
  busy: selectDiagnosticsBusy(state),
  current: selectDiagnosticsRequest(state),
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Detailed));
