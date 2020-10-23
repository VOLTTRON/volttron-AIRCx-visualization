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

import {
  ButtonBase,
  FormControlLabel,
  Slide,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowBackIos,
  ArrowForwardIos,
  BarChart,
  ShowChart,
} from "@material-ui/icons";
import clsx from "clsx";
import { MuiButton, MuiCheckbox, MuiDialog, MuiLoading } from "components";
import {
  selectTransmogrifyDetailed,
  selectTransmogrifyDetailedBusy,
  transmogrifyDetailed,
} from "controllers/data/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { AutoSizer } from "react-virtualized";
import Chart from "./Chart";
import Clock from "./Clock";
import styles from "./styles";

const charts = [
  {
    name: "primary",
    label: "Device Data",
    icon: ShowChart,
    show: () => true,
  },
  {
    name: "secondary",
    label: "Subdevice Data",
    icon: BarChart,
    show: (data) =>
      Object.keys(_.get(data, ["detailed", "subdevices"], {})).length > 0,
  },
];

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: undefined,
      chart: charts[0],
      filter: [],
    };
  }

  componentDidMount() {
    this.updateData();
  }

  handleHover = (event) => {
    const { hour } = event;
    this.setState({ hour });
  };

  handleNavigation = (value) => {
    this.setState({ chart: value }, this.updateData);
  };

  handleFilter = (value) => {
    const { filter } = this.state;
    if (_.isArray(value)) {
      this.setState({ filter: value }, this.updateData);
    } else if (filter.includes(value)) {
      this.setState({ filter: _.difference(filter, [value]) }, this.updateData);
    } else {
      this.setState({ filter: _.concat(filter, [value]) }, this.updateData);
    }
  };

  updateData = () => {
    const { path } = this.props;
    const { chart, filter } = this.state;
    const type = chart.name;
    this.props.transmogrifyDetailed({ type, filter, path });
  };

  renderNavigation = () => {
    const { classes, data } = this.props;
    const { chart } = this.state;
    return (
      <div className={clsx(classes.row, classes.navigation)}>
        {charts
          .filter((c) => c.show(data) && c.name === chart.name)
          .map((c) => {
            const MuiIcon = c.icon;
            return (
              <Slide
                key={`slide-${c.name}`}
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
              >
                <div key={`link-${c.name}`} className={classes.current}>
                  <MuiIcon
                    key={`icon-${c.name}`}
                    className={classes.linkIcon}
                  />
                  <Typography
                    key={`text-${c.name}`}
                    className={classes.current}
                    variant="h6"
                  >
                    <strong>{c.label}</strong>
                  </Typography>
                </div>
              </Slide>
            );
          })}
        <div className={classes.spacer} />
        {charts
          .filter((c) => c.show(data) && c.name !== chart.name)
          .map((c) => {
            const MuiIcon = c.icon;
            return (
              <ButtonBase
                key={`link-${c.name}`}
                className={clsx(classes.link, classes.linkPad)}
                onClick={() => this.handleNavigation(c)}
              >
                <MuiIcon
                  key={`icon-${c.name}`}
                  className={classes.linkIcon}
                  color="primary"
                />
                <Typography key={`text-${c.name}`} variant="h6" color="primary">
                  <strong>{c.label}</strong>
                </Typography>
              </ButtonBase>
            );
          })}
      </div>
    );
  };

  renderSubdevices() {
    const { classes, data } = this.props;
    const { filter } = this.state;
    const subdevices = _.uniq(
      _.concat(
        ...Object.values(_.get(data, ["detailed", "subdevices"], {})).map((v) =>
          Object.keys(v)
        )
      )
    );
    return (
      <div className={classes.subdevicesContent}>
        <Typography
          style={{ paddingLeft: "10px", paddingBottom: "10px" }}
          variant="h6"
        >
          <strong>Subdevices</strong>
        </Typography>
        <FormControlLabel
          key={"form-control-label-all"}
          style={{ paddingBottom: "10px" }}
          className={classes.subdevicesLabel}
          control={
            <MuiCheckbox
              key={"checkbox-all"}
              style={{ marginRight: "5px" }}
              aria-label={"Select All"}
              indeterminate={
                filter.length > 0 && filter.length < subdevices.length
              }
              checked={filter.length === 0}
              onChange={() =>
                this.handleFilter(
                  filter.length === subdevices.length ? [] : subdevices
                )
              }
            />
          }
          label={
            filter.length === subdevices.length ? "Select All" : "Deselect All"
          }
        />
        {subdevices
          .sort((a, b) => a.localeCompare(b))
          .map((s) => (
            <FormControlLabel
              key={`form-control-label-${s}`}
              className={classes.subdevicesLabel}
              control={
                <MuiCheckbox
                  key={`checkbox-${s}`}
                  style={{ marginRight: "5px" }}
                  aria-label={s}
                  checked={!filter.includes(s)}
                  onChange={() => this.handleFilter(s)}
                />
              }
              label={s}
            />
          ))}
      </div>
    );
  }

  render() {
    const {
      classes,
      form,
      current,
      request,
      data,
      busy,
      transmogrify,
    } = this.props;
    const { hour, chart, filter } = this.state;
    return (
      <MuiDialog
        title={data.date.format("MMM Do, YYYY")}
        open={true}
        maxWidth="lg"
        onClose={this.props.onClose}
        disablePadding
      >
        <div>
          {this.renderNavigation()}
          <div className={classes.popupContent}>
            <div className={classes.popupPrevious}>
              <MuiButton
                // type="outlined"
                disabled={!this.props.isPrevious}
                onClick={this.props.onPrevious}
              >
                <ArrowBackIos color="primary" />
              </MuiButton>
            </div>
            <div className={classes.popupLeft}>
              {chart.name === "primary" ? (
                <Clock
                  form={form}
                  current={current}
                  data={data}
                  size={200}
                  hour={hour}
                />
              ) : (
                this.renderSubdevices()
              )}
            </div>
            <div className={classes.popupChart}>
              {data.busy || busy || !transmogrify ? (
                <MuiLoading />
              ) : (
                <AutoSizer>
                  {({ width, height }) => (
                    <Chart
                      key={`chart-${chart.name}`}
                      type={chart.name}
                      onHover={this.handleHover}
                      form={form}
                      data={transmogrify}
                      request={request}
                      width={width}
                      height={height}
                      filter={filter}
                    />
                  )}
                </AutoSizer>
              )}
            </div>
            <div className={classes.popupNext}>
              <MuiButton
                // type="outlined"
                disabled={!this.props.isNext}
                onClick={this.props.onNext}
              >
                <ArrowForwardIos color="primary" />
              </MuiButton>
            </div>
          </div>
        </div>
      </MuiDialog>
    );
  }
}

const mapStateToProps = (state) => ({
  transmogrify: selectTransmogrifyDetailed(state),
  busy: selectTransmogrifyDetailedBusy(state),
});

const mapActionToProps = { transmogrifyDetailed };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Popup));
