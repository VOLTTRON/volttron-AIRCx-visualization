import { withStyles, withTheme } from "@material-ui/core/styles";
import { MuiBusy, MuiFooter, MuiHeader } from "components";
import PropTypes from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";
import { getDocumentHeight } from "utils/utils";
import styles from "./styles";

class MuiLayout extends React.Component {
  state = { error: null, info: null };

  componentDidMount() {
    window.addEventListener("resize", this.updatePageSize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePageSize);
  }

  componentDidCatch(error, info) {
    this.setState({ error: error, info: info });
  }

  updatePageSize = () => {
    this.forceUpdate();
  };

  render() {
    const { classes, page, theme } = this.props;
    const { error } = this.state;
    if (error) {
      return <Redirect push to={`/error?message=${error.message}`} />;
    }
    // const name = page && page.name;
    const height = getDocumentHeight() - theme.mixins.toolbar.minHeight;
    return (
      <div className={classes.root}>
        <MuiHeader page={page} />
        {/* {name !== "Error" && <MuiNavigation page={page} />} */}
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{ height: height, overflowY: "auto" }}>
            {this.props.children}
          </div>
        </div>
        <MuiFooter />
        <MuiBusy />
      </div>
    );
  }
}

MuiLayout.propTypes = {
  page: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withTheme(withStyles(styles)(MuiLayout));
