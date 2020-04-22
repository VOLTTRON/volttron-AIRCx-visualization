import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@material-ui/icons";
import { MuiButton, MuiIconButton, MuiSelect } from "components";
import MuiLink from "components/MuiNavigation/MuiLink";
import { black, white } from "constants/palette";
import { selectMode, setMode } from "controllers/common/action";
import { fetchSources, selectSources } from "controllers/data/action";
import {
  logoutUser,
  selectLoginUser,
  selectLoginUserRequest,
  selectUser,
} from "controllers/user/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { routes } from "routes";
import styles from "./styles";

class MuiHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      site: "",
      building: "",
      device: "",
      diagnostic: "",
      range: "",
    };
  }

  componentDidMount() {
    this.props.fetchSources();
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
    switch (key) {
      case "site":
        this.setState({ building: "" });
      // break omitted
      // eslint-disable-next-line
      case "building":
        this.setState({ device: "" });
        break;
      default:
      // no need to handle all cases
    }
  };

  isDisabled = (key) => {
    const { site, building, device, diagnostic } = this.state;
    switch (key) {
      case "load-data":
        return (
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
    console.log("Load Data...");
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
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "90px",
          paddingRight: "90px",
          background: white,
        }}
      >
        <div className={classes.spacer} />
        <MuiLink to={temp.path}>
          <MuiIcon color="primary" />
          <Typography color="primary">
            <strong>{temp.label}</strong>
          </Typography>
        </MuiLink>
      </div>
    );
  }

  renderTitle() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "90px",
          paddingRight: "90px",
          background: white,
        }}
      >
        <Typography variant="h6" className={classes.title}>
          <strong>{`Fault Detection & Diagnostic Visualization`}</strong>
        </Typography>
      </div>
    );
  }

  renderForm() {
    const { classes, sources } = this.props;
    const { site, building, device, diagnostic, range } = this.state;
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "90px",
          paddingRight: "90px",
          background: white,
          height: "136px",
          paddingTop: "45px",
        }}
      >
        <div style={{ width: "136px", marginRight: "24px" }}>
          <MuiSelect
            id="site"
            placeholder="Site"
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
        <div style={{ width: "136px", marginRight: "24px" }}>
          <MuiSelect
            id="building"
            placeholder="Building"
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
        <div style={{ width: "136px", marginRight: "24px" }}>
          <MuiSelect
            id="device"
            placeholder="Device"
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
        <div style={{ width: "166px", marginRight: "24px" }}>
          <MuiSelect
            id="diagnostic"
            placeholder="Diagnostic"
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
        <div style={{ width: "216px", marginRight: "24px" }}>
          <MuiSelect
            id="range"
            placeholder="Date Range"
            value={range}
            onChange={this.handleChange("range")}
          ></MuiSelect>
        </div>
        <div className={classes.spacer} />
        <div style={{ width: "136px" }}>
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
});

const mapActionToProps = {
  logoutUser,
  setMode,
  fetchSources,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiHeader));
