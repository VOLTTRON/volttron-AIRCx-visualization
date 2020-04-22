import { Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiDialog, MuiSection, MuiTextField } from "components";
import {
  continueUser,
  loginUser,
  selectLoginUser,
} from "controllers/user/action";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { MuiFooter } from "..";
import styles from "./styles";

const TabPanel = (props) => {
  const { children, index, value } = props;
  return <div hidden={value !== index}>{children}</div>;
};

class MuiLogin extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    value: 0,
  };

  componentDidMount() {
    this.props.continueUser();
  }

  validateField = () => {
    const { email, password, name, value } = this.state;
    if (value === 0) {
      return email && password;
    } else {
      const emailValid =
        email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
      return name && emailValid;
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleLogin = () => {
    if (this.validateField()) {
      const { email, password } = this.state;
      this.props.loginUser({ email, password });
      this.setState({ password: "" });
    }
    return false;
  };

  handleNewAccount = () => {
    // TODO handle new account
  };

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value });
  };

  buttons = () => {
    if (this.state.value === 0) {
      return [
        {
          disabled: !this.validateField(),
          label: "Login",
          onClick: this.handleLogin,
          type: "primary",
        },
      ];
    } else if (this.state.value === 1) {
      return [
        {
          label: "Create New Account",
          disabled: !this.validateField(),
          onClick: this.handleNewAccount,
          type: "primary",
        },
      ];
    }
  };

  render() {
    const { classes, auth, busy } = this.props;
    const { email, name, password } = this.state;
    if (auth) {
      return null;
    }
    return (
      <React.Fragment>
        <MuiDialog
          title={`${process.env.REACT_APP_TITLE}`}
          open={!auth}
          busy={busy}
          buttons={this.buttons()}
          disablePadding
        >
          <Fragment>
            <Tabs
              className={classes.tabs}
              value={this.state.value}
              onChange={this.handleTabChange}
              indicatorColor="primary"
            >
              <Tab label="Login" />
              <Tab label="New Account" />
            </Tabs>
            <TabPanel value={this.state.value} index={0}>
              <MuiSection>
                <MuiTextField
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange("email")}
                />
                <MuiTextField
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange("password")}
                  type="password"
                />
              </MuiSection>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <MuiSection>
                <MuiTextField
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={this.handleChange("name")}
                />
                <MuiTextField
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange("email")}
                />
              </MuiSection>
            </TabPanel>
          </Fragment>
        </MuiDialog>
        <MuiFooter />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: selectLoginUser(state),
});

const mapActionToProps = {
  continueUser,
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiLogin));
