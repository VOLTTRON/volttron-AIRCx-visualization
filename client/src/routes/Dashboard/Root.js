import { MuiLayout, MuiLogin, MuiNotice } from "components";
import { selectNotice } from "controllers/common/action";
import { selectLoginUser, selectUser } from "controllers/user/action";
import React from "react";
import { connect } from "react-redux";
import { parseBoolean } from "utils/utils";
import Page from ".";
import route from "./route";

class Root extends React.Component {
  render() {
    const { notice, auth, user } = this.props;
    if (parseBoolean(process.env.REACT_APP_NOTICE) && !notice) {
      return <MuiNotice />;
    } else if (route.user && !auth) {
      return <MuiLogin />;
    } else if (route.user && !user) {
      return <React.Fragment />;
    } else {
      return (
        <MuiLayout page={route}>
          <Page page={route} incomplete />
        </MuiLayout>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  notice: selectNotice(state),
  auth: selectLoginUser(state),
  user: selectUser(state),
});

const mapActionToProps = {};

export default connect(mapStateToProps, mapActionToProps)(Root);
