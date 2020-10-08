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
