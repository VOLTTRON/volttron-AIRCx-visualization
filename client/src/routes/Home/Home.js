import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
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
          <Typography variant="body1" paragraph>
            Home content goes here...
          </Typography>
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
