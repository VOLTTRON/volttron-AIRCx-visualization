import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  withWidth,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { selectMode, setMode } from "controllers/common/action";
import { selectUser } from "controllers/user/action";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { routes } from "routes";
import { ConditionalWrapper } from "utils/utils";
import MuiLink from "./MuiLink";
import styles from "./styles";

class MuiNavigation extends React.Component {
  constructor(props) {
    super(props);

    const { page } = props;
    this.home = page && page.path === "/";
    this.state = {
      open: true,
      windowWidth: window.innerWidth,
    };
  }

  handleChange = (key) => (event, value) => {
    const { mode } = this.props;
    switch (key) {
      case "route":
        if (mode) {
          this.props.setMode({
            ...mode,
            mode: mode.modes.length > 0 ? mode.modes[0] : null,
          });
        }
        break;
      default:
        this.setState({ [key]: value });
    }
  };

  render() {
    const { classes, page, mode, user } = this.props;
    const { open } = this.state;
    const name = page && page.name;
    const temp = routes.filter(
      (route) =>
        !route.hidden &&
        (!route.admin ||
          (route.admin && _.get(user, "scope", "").includes("admin")))
    );
    const indent = !_.isUndefined(_.get(mode, ["mode", "indent"]))
      ? mode.mode.indent
      : page.indent;
    const navWidth = indent ? 200 : 50;
    const indentWidth = indent ? 250 : 50;
    return (
      <Drawer
        className={classes.drawer}
        style={{ width: `${indentWidth - 20}px` }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{ style: { width: `${navWidth}px`, overflow: "hidden" } }}
      >
        <div className={classes.toolbar} />
        <List component="nav" className={classes.list}>
          {temp.map((route) => {
            const MuiIcon = route.icon;
            const selected = route.name === name;
            return (
              <ListItem
                button
                disableGutters
                className={clsx(
                  selected
                    ? classes.listItemSelected
                    : classes.listItemNotSelected
                )}
                key={`list-item-${route.name}`}
                component={MuiLink}
                to={route.path}
                tabIndex={route.index}
                onClick={this.handleChange("route")}
              >
                {indent ? (
                  <React.Fragment>
                    <ListItemIcon
                      key={`list-item-icon-${route.name}`}
                      className={classes.listItemIcon}
                    >
                      <MuiIcon color={selected ? "primary" : "inherit"} />
                    </ListItemIcon>
                    <ListItemText
                      key={`list-item-text-${route.name}`}
                      className={clsx(classes.listItemText)}
                      color={selected ? "primary" : "inherit"}
                      primary={
                        <ConditionalWrapper
                          condition={selected}
                          wrapper={(c) => <strong>{c}</strong>}
                        >{`${
                          route.short ? route.short : route.label
                        }`}</ConditionalWrapper>
                      }
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Tooltip title={route.label}>
                      <ListItemIcon key={`list-item-icon-${route.name}`}>
                        <MuiIcon color={selected ? "primary" : "inherit"} />
                      </ListItemIcon>
                    </Tooltip>
                  </React.Fragment>
                )}
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

MuiNavigation.propTypes = {
  page: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectUser(state),
  mode: selectMode(state),
});

const mapActionToProps = {
  setMode,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(MuiNavigation)));
