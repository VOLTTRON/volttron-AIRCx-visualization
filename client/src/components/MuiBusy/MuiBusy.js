import { Modal } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiLoading } from "components";
import { BUSY_GLOBAL, selectBusyTokens } from "controllers/busy/action";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

const isBusy = busy => {
  const count = busy
    ? Object.values(busy).filter(v => v.type === BUSY_GLOBAL).length
    : 0;
  return count > 0;
};

class MuiBusy extends React.Component {
  static defaultProps = {
    busy: false
  };

  render() {
    const { classes, busy } = this.props;
    return (
      <Modal open={busy} className={classes.modal}>
        <MuiLoading />
      </Modal>
    );
  }
}

MuiBusy.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  busy: isBusy(selectBusyTokens(state))
});

export default connect(mapStateToProps)(withStyles(styles)(MuiBusy));
