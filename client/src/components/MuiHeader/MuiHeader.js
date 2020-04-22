import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  AccountCircle as AccountCircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@material-ui/icons";
import { MuiIconButton } from "components";
import { primary, primaryTint } from "constants/palette";
import { selectMode, setMode } from "controllers/common/action";
import {
  logoutUser,
  selectLoginUser,
  selectLoginUserRequest,
  selectUser,
} from "controllers/user/action";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class MuiHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

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

  render() {
    const { classes, page, auth, request, user, mode } = this.props;
    const { anchorEl, type } = this.state;
    const username = user ? user.email : request ? request.email : "Unknown";
    return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar
          variant="dense"
          style={{ backgroundColor: primary }}
          className={classes.toolbar}
        >
          <Typography variant="h6" className={classes.title}>
            {process.env.REACT_APP_TITLE}
          </Typography>
          {/* <img
            className={classes.image}
            src="images/App_Logo_Color.png"
            alt={process.env.REACT_APP_TITLE}
          /> */}
          <Typography variant="h6" className={classes.page}>
            {page.label}
          </Typography>
          {mode && (
            <React.Fragment>
              <Typography variant="h6" className={classes.mode}>
                {mode.mode.label}
              </Typography>
              <MuiIconButton
                color={primaryTint}
                onClick={this.handleOpen("mode")}
              >
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
          <Typography variant="h6" className={classes.spacer}></Typography>
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
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: selectLoginUser(state),
  request: selectLoginUserRequest(state),
  user: selectUser(state),
  mode: selectMode(state),
});

const mapActionToProps = {
  logoutUser,
  setMode,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiHeader));
