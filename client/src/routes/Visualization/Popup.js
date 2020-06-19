import { withStyles } from "@material-ui/core/styles";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { MuiButton, MuiDialog, MuiLoading } from "components";
import React from "react";
import { connect } from "react-redux";
import { AutoSizer } from "react-virtualized";
import ChartPlotly from "./ChartPlotly";
import Clock from "./Clock";
import styles from "./styles";

class Popup extends React.Component {
  render() {
    const { classes, form, request, data } = this.props;
    return (
      <MuiDialog
        title={data.date.format("MMM Do, YYYY")}
        open={true}
        maxWidth="lg"
        onClose={this.props.onClose}
        disablePadding
      >
        <div className={classes.popupContent}>
          <div className={classes.popupPrevious}>
            <MuiButton
              // type="outlined"
              disabled={!this.props.isPrevious}
              onClick={this.props.onPrevious}
            >
              <ArrowBackIos color="primary" />
            </MuiButton>
          </div>
          <div className={classes.popupClock}>
            <Clock form={form} data={data} size={200} />
          </div>
          <div className={classes.popupChart}>
            {data.busy ? (
              <MuiLoading />
            ) : (
              <AutoSizer>
                {({ width, height }) => (
                  <ChartPlotly
                    form={form}
                    data={data}
                    request={request}
                    width={width}
                    height={height}
                  />
                )}
              </AutoSizer>
            )}
          </div>
          <div className={classes.popupNext}>
            <MuiButton
              // type="outlined"
              disabled={!this.props.isNext}
              onClick={this.props.onNext}
            >
              <ArrowForwardIos color="primary" />
            </MuiButton>
          </div>
        </div>
      </MuiDialog>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Popup));
