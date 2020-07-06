import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import dashboard from "routes/Dashboard/route";
import styles from "./styles";

class Home extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid
        className={classes.root}
        container
        alignContent="center"
        justify="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Redirect to={dashboard.path} />
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
)(withStyles(styles)(Home));
