import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  withWidth
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles";

class MuiStepper extends React.Component {
  static defaultProps = {
    disabled: []
  };

  constructor(props) {
    super(props);
    this.state = {
      step: props.step
    };
  }

  notifyStepChange = step => {
    if (this.props.onStepChange != null) {
      this.props.onStepChange(step);
    }
  };

  handleNext = () => {
    const step = this.state.step + 1;
    this.setState({
      step: step
    });
    this.notifyStepChange(step);
  };

  handleBack = () => {
    const step = this.state.step - 1;
    this.setState({
      step: step
    });
    this.notifyStepChange(step);
  };

  handleReset = () => {
    this.setState({
      step: 0
    });
    this.notifyStepChange(0);
  };

  render() {
    const { steps, disabled, classes, width } = this.props;
    const { step } = this.state;
    var icon = false;
    switch (width) {
      case "xs":
      case "sm":
        icon = true;
        break;
      default:
        icon = false;
    }
    return (
      <Toolbar>
        <Button
          style={{ minWidth: icon ? 16 : 64 }}
          disabled={step === 0 || disabled.indexOf(step - 1) !== -1}
          onClick={this.handleBack.bind(this)}
          color="secondary"
          variant="contained"
        >
          {icon ? <ArrowBackIcon /> : "Back"}
        </Button>
        <Stepper activeStep={step} className={classes.stepper}>
          {steps.map(function(item, index) {
            return (
              <Step key={item.name}>
                <StepLabel>{item.name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Button
          style={{ minWidth: icon ? 16 : 64 }}
          disabled={
            step === steps.length - 1 || disabled.indexOf(step + 1) !== -1
          }
          onClick={this.handleNext.bind(this)}
          color="secondary"
          variant="contained"
        >
          {icon ? <ArrowForwardIcon /> : "Next"}
        </Button>
      </Toolbar>
    );
  }
}

MuiStepper.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  disabled: PropTypes.arrayOf(PropTypes.number.isRequired),
  onStepChange: PropTypes.func
};

export default withWidth()(withStyles(styles)(MuiStepper));
