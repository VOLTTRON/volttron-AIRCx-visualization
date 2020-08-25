import {
  AppBar,
  Menu,
  MenuItem,
  Slide,
  Snackbar,
  Toolbar,
  Typography,
  withWidth,
} from "@material-ui/core";
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
import groups from "constants/groups";
import { black, primary, white } from "constants/palette";
import sensitivities from "constants/sensitivities";
import { selectMode, setMode } from "controllers/common/action";
import {
  fetchDiagnostics,
  fetchSources,
  selectDataForm,
  selectDiagnostics,
  selectDiagnosticsBusy,
  selectDiagnosticsRequest,
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
import mixin from "utils/mixin";
import { ConditionalWrapper } from "utils/utils";
import styles from "./styles";

const createFormUpdate = (state, sources) => {
  const items = sources ? _.merge({}, ...Object.values(sources)) : {};
  const update = {};
  const sites = Object.keys(items).sort((a, b) => a.localeCompare(b));
  if (sites.length === 1 && _.isEmpty(state.site)) {
    update.site = sites[0];
  }
  const site = _.get(_.merge({}, state, update), "site");
  const buildings = Object.keys(_.get(items, [site], [])).sort((a, b) =>
    a.localeCompare(b)
  );
  if (site && buildings.length === 1 && _.isEmpty(state.building)) {
    update.building = buildings[0];
  }
  const building = _.get(_.merge({}, state, update), "building");
  const devices = Object.keys(_.get(items, [site, building], [])).sort((a, b) =>
    a.localeCompare(b)
  );
  if (building && devices.length === 1 && _.isEmpty(state.device)) {
    update.device = devices[0];
  }
  const device = _.get(_.merge({}, state, update), "device");
  const diagnostics = sources
    ? Object.keys(sources).filter((d) =>
        Boolean(_.get(sources, [d, site, building, device]))
      )
    : [];
  if (diagnostics.length === 1 && _.isEmpty(state.diagnostic)) {
    update.diagnostic = diagnostics[0];
  }
  return update;
};

class MuiHeader extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return createFormUpdate(state, props.sources);
  }

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      site: "",
      building: "",
      device: "",
      diagnostic: "",
      start: moment()
        .subtract(1, "day")
        .format(),
      end: moment().format(),
      group: "",
      filter: "",
      sensitivity: "",
      changed: false,
    };
    _.merge(this, mixin);
  }

  componentDidMount() {
    const { form, sources } = this.props;
    this.props.fetchSources();
    this.setState(createFormUpdate(_.merge(this.state, form), sources));
  }

  handleUpdate = (key) => () => {
    const form = _.pick(this.state, [
      "site",
      "building",
      "device",
      "diagnostic",
      "start",
      "end",
      "group",
      "filter",
      "sensitivity",
      "date",
    ]);
    switch (key) {
      case "site":
        form.building = "";
      // eslint-disable-next-line
      case "building":
        form.device = "";
      // eslint-disable-next-line
      case "device":
        form.diagnostic = "";
      // eslint-disable-next-line
      case "diagnostic":
      case "end":
        this.setState(_.merge({ changed: true }, form));
      // eslint-disable-next-line
      case "group":
      case "filter":
      case "sensitivity":
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
              moment().endOf("day")
            )
            .format();
          this.setState(form);
        }
        this.setState({ changed: true });
      // eslint-disable-next-line
      case "update":
        this.props.setDataForm(form);
        break;
      default:
      // no need to handle all cases
    }
  };

  isLogin = () => {
    const { user } = this.props;
    if (Boolean(user)) {
      return true;
    } else if (routes.find((r) => r.user || r.admin)) {
      return true;
    } else {
      return false;
    }
  };

  isDisabled = (key) => {
    const { busy } = this.props;
    const { site, building, device, diagnostic } = this.state;
    switch (key) {
      case "load-data":
        return (
          !this.isFormChanged() ||
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

  isFormChanged = () => {
    const { form, current } = this.props;
    const attributes = [
      "start",
      "end",
      "site",
      "building",
      "device",
      "diagnostic",
    ];
    return !_.isEqual(_.pick(form, attributes), _.pick(current, attributes));
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
    const { sources, form } = this.props;
    const updated = _.merge(
      {},
      form,
      _.pick(this.state, ["site", "building", "device", "diagnostic"])
    );
    const { site, building, device, diagnostic } = updated;
    const topic = Object.values(
      _.get(sources, [diagnostic, site, building, device], {})
    );
    this.handleUpdate("update")();
    this.setState({ changed: false });
    this.props.fetchDiagnostics(_.merge({}, updated, { topic }));
  };

  renderNotice() {
    const { busy, current, loaded } = this.props;
    const open = !busy && loaded && this.isFormChanged();
    const { start, end, site, building, device, diagnostic } = current
      ? current
      : {};
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ top: 0, width: "100%" }}
        ContentProps={
          !this.isLogin() && {
            style: {
              background: primary,
              color: white,
              width: "100%",
              justifyContent: "center",
              borderRadius: "0px",
              padding: "0px",
            },
          }
        }
        open={open}
        message={`Showing data for ${site}, ${building}, ${device}, ${diagnostic}, ${moment(
          start
        ).format("MM/DD/YYYY")} - ${moment(end).format("MM/DD/YYYY")}.`}
      />
    );
  }

  renderUser() {
    const { classes, auth, request, user, mode } = this.props;
    const { anchorEl, type } = this.state;
    const username = user ? user.email : request ? request.email : "Unknown";
    return (
      <Toolbar variant="dense" className={classes.toolbar}>
        {this.isLogin() && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </Toolbar>
    );
  }

  renderNavigation() {
    const { classes, page, user } = this.props;
    const temp = routes.filter(
      (route) =>
        !route.hidden &&
        (!route.admin ||
          (route.admin && _.get(user, "scope", "").includes("admin")))
    );
    return (
      <div className={clsx(classes.row, classes.navigation)}>
        {temp
          .filter((route) => route.name === page.name)
          .map((r) => {
            const MuiIcon = r.icon;
            return (
              <Slide
                key={`slide-${r.name}`}
                direction="left"
                in={true}
                mountOnEnter
                unmountOnExit
              >
                <div key={`link-${r.name}`} className={classes.current}>
                  <MuiIcon
                    key={`icon-${r.name}`}
                    className={classes.linkIcon}
                  />
                  <Typography
                    key={`text-${r.name}`}
                    className={classes.current}
                    variant="h6"
                  >
                    <strong>{r.label}</strong>
                  </Typography>
                </div>
              </Slide>
            );
          })}
        <div className={classes.spacer} />
        {temp
          .filter((route) => route.name !== page.name)
          .map((r) => {
            const MuiIcon = r.icon;
            return (
              <MuiLink
                key={`link-${r.name}`}
                className={clsx(classes.link, classes.linkPad)}
                to={r.path}
              >
                <MuiIcon
                  key={`icon-${r.name}`}
                  className={classes.linkIcon}
                  color="primary"
                />
                <Typography key={`text-${r.name}`} variant="h6" color="primary">
                  <strong>{r.label}</strong>
                </Typography>
              </MuiLink>
            );
          })}
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
    const { classes, width, page, sources } = this.props;
    const {
      site,
      building,
      device,
      diagnostic,
      group,
      filter,
      start,
      end,
      sensitivity,
    } = this.state;
    const diagnostics = sources
      ? Object.keys(sources).filter((d) =>
          Boolean(_.get(sources, [d, site, building, device]))
        )
      : [];
    const items = sources ? _.merge({}, ...Object.values(sources)) : {};
    const small = width !== "xl";
    return (
      <ConditionalWrapper
        condition={!small}
        wrapper={(c) => (
          <div className={clsx(classes.row, classes.form)}>{c}</div>
        )}
      >
        <ConditionalWrapper
          condition={small}
          wrapper={(c) => (
            <div
              className={clsx(classes.row, classes.form)}
              style={{ height: "85px" }}
            >
              {c}
            </div>
          )}
        >
          <div className={classes.site}>
            <MuiSelect
              id="site"
              header="Site"
              placeholder="Select"
              value={site}
              onChange={this.handleChange("site")}
            >
              {Object.keys(items)
                .sort((a, b) => a.localeCompare(b))
                .map((i) => (
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
              placeholder="Select"
              value={building}
              onChange={this.handleChange("building")}
            >
              {Object.keys(_.get(items, [site], {}))
                .sort((a, b) => a.localeCompare(b))
                .map((i) => (
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
              placeholder="Select"
              value={device}
              onChange={this.handleChange("device")}
            >
              {Object.keys(_.get(items, [site, building], {}))
                .sort((a, b) => a.localeCompare(b))
                .map((i) => (
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
              placeholder="Select"
              value={diagnostic}
              onChange={this.handleChange("diagnostic")}
            >
              {diagnostics.map((i) => (
                <MenuItem key={`diagnostic-${i}`} value={i}>
                  {i}
                </MenuItem>
              ))}
            </MuiSelect>
          </div>
        </ConditionalWrapper>
        <ConditionalWrapper
          condition={small}
          wrapper={(c) => (
            <div className={clsx(classes.row, classes.form)}>{c}</div>
          )}
        >
          <div className={classes.from}>
            <MuiDatePicker
              id="start"
              header="Date Range"
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
                  .endOf("day"),
                moment().endOf("day")
              )}
              value={moment(end)}
              onChange={(v) =>
                this.handleChange("end")(
                  null,
                  _.isEmpty(v) ? "" : v.endOf("day").format()
                )
              }
            />
          </div>
          {page.name === "Dashboard" || page.name === "Detailed" ? (
            <div className={classes.group}>
              <MuiSelect
                id="group"
                header="Aggregation Period"
                placeholder="Group"
                value={group}
                onChange={this.handleChange("group")}
                renderValue={(v) => {
                  const value = groups.parse(v);
                  if (value) {
                    return <React.Fragment>{value.label}</React.Fragment>;
                  }
                }}
              >
                {groups.values
                  .filter((v) =>
                    page.name === "Dashboard" ? v.increment === "hour" : true
                  )
                  .map((i) => (
                    <MenuItem key={`group-${i.name}`} value={i.name}>
                      {i.label}
                    </MenuItem>
                  ))}
              </MuiSelect>
            </div>
          ) : null}
          {page.name === "Visualization" ? (
            <div className={classes.filter}>
              <MuiSelect
                id="filter"
                header="Filter"
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
          <div className={classes.sensitivity}>
            <MuiSelect
              id="sensitivity"
              header="Sensitivity"
              placeholder="Select"
              value={sensitivity}
              onChange={this.handleChange("sensitivity")}
              renderValue={(v) => {
                const value = sensitivities.parse(v);
                if (value) {
                  return <React.Fragment>{value.label}</React.Fragment>;
                }
              }}
            >
              {sensitivities.values.map((i) => (
                <MenuItem
                  style={{ whiteSpace: "normal" }}
                  key={`sensitivity-${i.name}`}
                  value={i.name}
                >
                  <div>
                    <Typography>{i.label}</Typography>
                    <Typography
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        fontSize: ".8rem",
                      }}
                    >
                      {i.description}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </MuiSelect>
          </div>
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
        </ConditionalWrapper>
      </ConditionalWrapper>
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
        {this.renderNotice()}
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
  current: selectDiagnosticsRequest(state),
  loaded: Boolean(selectDiagnostics(state)),
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
)(withWidth()(withStyles(styles)(MuiHeader)));
