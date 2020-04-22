import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { MuiDialog } from "components";
import { selectNotice, setNotice } from "controllers/common/action";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles";

class MuiNotice extends Component {
  handleAcknowledge = () => {
    this.props.setNotice("viewed");
  };

  buttons = () => {
    return [
      {
        disabled: false,
        label: "Acknowledge",
        onClick: this.handleAcknowledge,
        type: "primary",
      },
    ];
  };

  render() {
    const { notice } = this.props;
    if (notice) {
      return null;
    }
    return (
      <MuiDialog
        title={`${process.env.REACT_APP_TITLE}`}
        maxWidth="md"
        open={!notice}
        buttons={this.buttons()}
      >
        <React.Fragment>
          <Typography paragraph>
            This is a Federal computer system and is the property of the United
            States Government. This system is for authorized use only. All users
            (authorized or unauthorized) have no explicit or implicit
            expectation of privacy.
          </Typography>
          <Typography paragraph>
            Any or all uses of this system and all files on this system may be
            intercepted, monitored, recorded, copied, audited, inspected, and
            disclosed to authorized site, Department of Energy, and law
            enforcement personnel, as well as authorized officials of other
            agencies, domestic and foreign. By using this system the user
            consents to such interception, monitoring, recording, copying,
            auditing, inspection, and disclosure at the discretion of authorized
            site or Department of Energy personnel.
          </Typography>
          <Typography paragraph>
            Unauthorized or improper use of this system may result in
            administrative disciplinary action and civil and criminal penalties.
            By continuing to use this system you indicate your awareness of and
            consent to these terms and conditions of use. LOG OFF IMMEDIATELY if
            you do not agree to the conditions stated in this warning.
          </Typography>
        </React.Fragment>
      </MuiDialog>
    );
  }
}

const mapStateToProps = (state) => ({
  notice: selectNotice(state),
});

const mapActionToProps = {
  setNotice,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(MuiNotice));
