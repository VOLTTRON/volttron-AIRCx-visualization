import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Remove,
  Today as TodayIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import { MuiButton, MuiDatePicker, MuiIconButton, MuiSelect } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import filters from "constants/filters";
import { black } from "constants/palette";
import { selectMode, setMode } from "controllers/common/action";
import {
  fetchDiagnostics,
  fetchSources,
  selectDataForm,
  selectDiagnosticsBusy,
  selectSources,
  setDataForm,
} from "controllers/data/action";
import {
  logoutUser,
  selectLoginUser,
  selectLoginUserRequest,
  selectUser,
} from "controllers/user/action";
import _ from "lodash";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { routes } from "routes";
import styles from "./styles";

const createFormUpdate = (state, sources) => {
  const update = {};
  if (_.get(sources, ["sites"], []).length === 1 && _.isEmpty(state.site)) {
    update.site = _.get(sources, ["sites", "0"], "");
  }
  const site = _.get(_.merge({}, state, update), "site");
  if (
    site &&
    _.get(sources, ["buildings", site], []).length === 1 &&
    _.isEmpty(state.building)
  ) {
    update.building = _.get(sources, ["buildings", site, "0"], "");
  }
  const building = _.get(_.merge({}, state, update), "building");
  if (
    building &&
    _.get(sources, ["devices", building], []).length === 1 &&
    _.isEmpty(state.device)
  ) {
    update.device = _.get(sources, ["devices", building, "0"], "");
  }
  if (
    _.get(sources, ["diagnostics"], []).length === 1 &&
    _.isEmpty(state.diagnostic)
  ) {
    update.diagnostic = _.get(sources, ["diagnostics", "0"], "");
  }
  return update;
};

class MuiHeader extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return createFormUpdate(prevState, _.get(nextProps, ["sources"], {}));
  }

  state = {
    anchorEl: null,
    site: "",
    building: "",
    device: "",
    diagnostic: "",
    start: moment()
      .subtract(1, "day")
      .format(),
    end: moment().format(),
    filter: "",
    changed: false,
  };

  componentDidMount() {
    const { form, sources } = this.props;
    this.props.fetchSources();
    this.setState(createFormUpdate(_.merge(this.state, form), sources));
  }

  handleChange = (key) => (event, value) => {
    value = _.get(event, "target.value", value);
    const state = key ? { [key]: value } : _.assign({}, value);
    const updated = _.intersection(_.keys(this.state), _.keys(state))
      .map((k) => this.state[k] !== state[k])
      .includes(true);
    if (updated) {
      this.setState(state, this.handleUpdate(key));
    }
  };

  handleUpdate = (key) => () => {
    const form = _.pick(this.state, [
      "site",
      "building",
      "device",
      "diagnostic",
      "start",
      "end",
      "filter",
    ]);
    switch (key) {
      case "site":
        form.building = "";
        form.device = "";
        this.setState({ changed: true });
        this.setState(form);
        this.props.setDataForm(form);
        break;
      case "building":
        form.device = "";
        this.setState({ changed: true });
        this.setState(form);
        this.props.setDataForm(form);
        break;
      case "device":
      case "diagnostic":
      case "end":
        this.setState({ changed: true });
        this.props.setDataForm(form);
        break;
      case "filter":
        this.props.setDataForm(form);
        break;
      case "start":
        const { start } = _.get(this.props, ["form"], {});
        if (start) {
          form.end = moment
            .min(
              moment(form.end).add(
                moment(form.start).diff(moment(start), "day", true),
                "day"
              ),
              moment().startOf("day")
            )
            .format();
          this.setState(form);
        }
        this.setState({ changed: true });
        this.props.setDataForm(form);
        break;
      default:
      // no need to handle all cases
    }
  };

  isDisabled = (key) => {
    const { busy } = this.props;
    const { site, building, device, diagnostic, changed } = this.state;
    switch (key) {
      case "load-data":
        return (
          !changed ||
          Boolean(busy) ||
          _.isEmpty(site) ||
          _.isEmpty(building) ||
          _.isEmpty(device) ||
          _.isEmpty(diagnostic)
        );
      default:
        return false;
    }
  };

  handleOpen = (type) => (event) => {
    this.setState({ type: type, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ type: null, anchorEl: null });
  };

  handleMode = (selected) => {
    const { mode } = this.props;
    this.props.setMode({ ...mode, mode: selected });
    this.handleClose();
  };

  handleLogout = () => {
    this.handleClose();
    this.props.logoutUser();
  };

  handleLoadData = () => {
    this.setState({ changed: false });
    this.props.fetchDiagnostics();
  };

  renderUser() {
    const { classes, auth, request, user, mode } = this.props;
    const { anchorEl, type } = this.state;
    const username = user ? user.email : request ? request.email : "Unknown";
    return (
      <Toolbar variant="dense" className={classes.toolbar}>
        <AccountCircleIcon />
        <Typography variant="h6" className={classes.user}>
          {auth ? username : "Guest"}
        </Typography>
        <MuiIconButton color="inherit" onClick={this.handleOpen("user")}>
          <KeyboardArrowDownIcon />
        </MuiIconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          open={type === "user"}
          onClose={this.handleClose}
        >
          <MenuItem key="logout" onClick={this.handleLogout}>
            Logout
          </MenuItem>
        </Menu>
        <Typography className={classes.spacer} />
        {mode && (
          <React.Fragment>
            <Typography variant="h6" className={classes.mode}>
              {mode.mode.label}
            </Typography>
            <MuiIconButton color={black} onClick={this.handleOpen("mode")}>
              <KeyboardArrowDownIcon />
            </MuiIconButton>
            <Menu
              id="mode-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={type === "mode"}
              onClose={this.handleClose}
            >
              {mode.modes.map((m) => (
                <MenuItem
                  key={`mode-${m.name}`}
                  selected={m.name === mode.mode.name}
                  onClick={() => this.handleMode(m)}
                >
                  {m.label}
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </Toolbar>
    );
  }

  renderNavigation() {
    const { classes, page, user } = this.props;
    const temp = routes
      .filter(
        (route) =>
          !route.hidden &&
          (!route.admin ||
            (route.admin && _.get(user, "scope", "").includes("admin")))
      )
      .find((route) => route.name !== page.name);
    const MuiIcon = temp.icon;
    return (
      <div className={clsx(classes.row, classes.navigation)}>
        <div className={classes.spacer} />
        <MuiLink className={classes.link} to={temp.path}>
          <MuiIcon className={classes.linkIcon} color="primary" />
          <Typography variant="h6" color="primary">
            <strong>{temp.label}</strong>
          </Typography>
        </MuiLink>
      </div>
    );
  }

  renderTitle() {
    const { classes } = this.props;
    return (
      <div className={clsx(classes.row, classes.title)}>
        <Typography variant="h6" className={classes.titleLabel}>
          <strong>{`Fault Detection & Diagnostic Visualization`}</strong>
        </Typography>
      </div>
    );
  }

  renderForm() {
    const { classes, page, sources } = this.props;
    const {
      site,
      building,
      device,
      diagnostic,
      filter,
      start,
      end,
    } = this.state;
    return (
      <div className={clsx(classes.row, classes.form)}>
        <div className={classes.site}>
          <MuiSelect
            id="site"
            header="Site"
            value={site}
            onChange={this.handleChange("site")}
          >
            {_.get(sources, "sites", []).map((i) => (
              <MenuItem key={`site-${i}`} value={i}>
                {i}
              </MenuItem>
            ))}
          </MuiSelect>
        </div>
        <div className={classes.building}>
          <MuiSelect
            id="building"
            header="Building"
            value={building}
            onChange={this.handleChange("building")}
          >
            {_.get(sources, ["buildings", site], []).map((i) => (
              <MenuItem key={`building-${i}`} value={i}>
                {i}
              </MenuItem>
            ))}
          </MuiSelect>
        </div>
        <div className={classes.device}>
          <MuiSelect
            id="device"
            header="Device"
            value={device}
            onChange={this.handleChange("device")}
          >
            {_.get(sources, ["devices", building], []).map((i) => (
              <MenuItem key={`device-${i}`} value={i}>
                {i}
              </MenuItem>
            ))}
          </MuiSelect>
        </div>
        <div className={classes.diagnostic}>
          <MuiSelect
            id="diagnostic"
            header="Diagnostic"
            value={diagnostic}
            onChange={this.handleChange("diagnostic")}
          >
            {_.get(sources, "diagnostics", []).map((i) => (
              <MenuItem key={`diagnostic-${i}`} value={i}>
                {i}
              </MenuItem>
            ))}
          </MuiSelect>
        </div>
        <div className={classes.from}>
          <MuiDatePicker
            id="start"
            placeholder="From Date"
            format="MM/DD/YYYY"
            value={moment(start)}
            onChange={(v) =>
              this.handleChange("start")(null, _.isEmpty(v) ? "" : v.format())
            }
            keyboardIcon={<TodayIcon />}
          />
        </div>
        <div className={classes.to}>
          <Remove className={classes.toIcon} />
        </div>
        <div className={classes.until}>
          <MuiDatePicker
            id="end"
            placeholder="Until Date"
            format="MM/DD/YYYY"
            minDate={moment(start)}
            maxDate={moment.min(
              moment(start)
                .add(1, "year")
                .subtract(1, "day"),
              moment()
            )}
            value={moment(end)}
            onChange={(v) =>
              this.handleChange("end")(null, _.isEmpty(v) ? "" : v.format())
            }
          />
        </div>
        {page.name === "Visualization" ? (
          <div className={classes.filter}>
            <MuiSelect
              id="filter"
              placeholder="Filter"
              value={filter}
              onChange={this.handleChange("filter")}
              renderValue={(v) => {
                const value = filters.parse(v);
                if (value) {
                  return (
                    <React.Fragment>
                      <span
                        className={classes.selectedBox}
                        style={{
                          background: value.color,
                        }}
                      />
                      {value.label}
                    </React.Fragment>
                  );
                }
              }}
            >
              {filters.values.map((i) => (
                <MenuItem key={`filter-${i.name}`} value={i.name}>
                  <span
                    className={classes.filterBox}
                    style={{ background: i.color }}
                  />
                  {i.label}
                </MenuItem>
              ))}
            </MuiSelect>
          </div>
        ) : null}
        <div className={classes.spacer} />
        <div className={classes.loadButton}>
          <MuiButton
            label="Load Data"
            type="primary"
            disabled={this.isDisabled("load-data")}
            onClick={this.handleLoadData}
            fullWidth
          >
            Load Data
          </MuiButton>
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.root}>
        {this.renderUser()}
        {this.renderNavigation()}
        {this.renderTitle()}
        {this.renderForm()}
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: selectLoginUser(state),
  request: selectLoginUserRequest(state),
  user: selectUser(state),
  mode: selectMode(state),
  sources: selectSources(state),
  form: selectDataForm(state),
  busy: selectDiagnosticsBusy(state),
});

const mapActionToProps = {
  logoutUser,
  setMode,
  fetchSources,
  setDataForm,
  fetchDiagnostics,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiHeader));
