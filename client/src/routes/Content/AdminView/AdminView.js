import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import styles from "./styles";

class AdminView extends React.Component {
  render() {
    const { page } = this.props;
    return (
      <Grid container alignContent="center" justify="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">{page.label}</Typography>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(AdminView));
