import { selectMode, setMode } from "controllers/common/action";
import { selectUser } from "controllers/user/action";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import AdminView from "./AdminView/AdminView";
import Content from "./Content";
import UserView from "./UserView/UserView";

class Root extends React.Component {
  componentDidMount() {
    const modes = this.createModes();
    this.props.setMode({
      mode: modes[0],
      modes: modes,
    });
  }

  componentWillUnmount() {
    this.props.setMode();
  }

  componentDidUpdate() {
    const { mode } = this.props;
    const modes = this.createModes();
    if (!_.isEqual(mode && mode.modes, modes)) {
      this.props.setMode({
        active: "",
        mode: mode && modes.includes(mode.mode) ? mode.mode : modes[0],
        modes: modes,
      });
    }
  }

  createModes = () => {
    const { user } = this.props;
    const modes = [
      { name: "main-view", label: "Main View", indent: true },
      ...(_.get(user, "scope", "").includes("admin")
        ? [{ name: "admin-view", label: "Admin View", indent: false }]
        : []),
      ...(_.get(user, "scope", "").includes("user")
        ? [{ name: "user-view", label: "User View", indent: false }]
        : []),
    ];
    return modes;
  };

  render() {
    const { page, mode } = this.props;
    switch (mode && mode.mode && mode.mode.name) {
      case "main-view":
        return <Content page={page} mode={mode} />;
      case "admin-view":
        return <AdminView page={page} mode={mode} />;
      case "user-view":
        return <UserView page={page} mode={mode} />;
      default:
        return <React.Fragment />;
    }
  }
}

const mapStateToProps = (state) => ({
  mode: selectMode(state),
  user: selectUser(state),
});

const mapActionToProps = { setMode };

export default connect(mapStateToProps, mapActionToProps)(Root);
