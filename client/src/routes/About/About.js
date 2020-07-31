import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { AutoSizer } from "react-virtualized";
import Chart from "routes/Visualization/Chart";
import Clock from "routes/Visualization/Clock";
import styles from "./styles";

class About extends React.Component {
  render() {
    // const { page } = this.props;
    return (
      // <Grid container alignContent="center" justify="center" spacing={2}>
      //   <Grid item xs={12}>
      // <Typography variant="h5">{page.label}</Typography>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ display: "inline-block", height: "100%" }}>
          <Clock data={[]} size={200} />
        </div>
        <div
          style={{
            display: "inline-block",
            flex: "1 1 auto",
            width: "100%",
            height: "100%",
          }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <Chart data={[]} width={width} height={height} />
            )}
          </AutoSizer>
        </div>
      </div>
      //   </Grid>
      // </Grid>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(About));
