import {
  Button,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Toolbar,
  withWidth,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles";

class MuiStepper extends React.Component {
  static defaultProps = {
    disabled: [],
  };

  notifyStepChange = (step) => {
    if (this.props.onStepChange) {
      this.props.onStepChange(step);
    }
  };

  handleNext = () => {
    const { steps, step, isStepAbove } = this.props;
    if (step < steps.length - 1) {
      this.notifyStepChange(step + 1);
    } else if (isStepAbove) {
      this.props.onStepAbove();
    }
  };

  handleBack = () => {
    const { step, isStepBelow } = this.props;
    if (step > 0) {
      this.notifyStepChange(step - 1);
    } else if (isStepBelow) {
      this.props.onStepBelow();
    }
  };

  handleReset = () => {
    this.notifyStepChange(0);
  };

  handleStepChange = (step) => (event, value) => {
    this.notifyStepChange(step);
  };

  useIcon = () => {
    const { useIcon, width } = this.props;
    if (useIcon) {
      return true;
    }
    switch (width) {
      case "xs":
      case "sm":
        return true;
      default:
        return false;
    }
  };

  renderStepper() {
    const {
      steps,
      step,
      alternativeLabel,
      nonLinear,
      disableGutters,
      classes,
    } = this.props;
    const { handleStepChange } = this;
    return (
      <Stepper
        className={clsx(
          classes.stepper,
          disableGutters && classes.disableGutters
        )}
        alternativeLabel={alternativeLabel}
        nonLinear={nonLinear}
        activeStep={step}
      >
        {steps.map(function(item, index) {
          return (
            <Step key={`step-${item.name}`}>
              <StepButton
                key={`step-button-${item.name}`}
                completed={false}
                onClick={nonLinear ? handleStepChange(index) : undefined}
                optional={item.optional}
                icon={item.icon}
                disableRipple
              >
                <StepLabel
                  className={clsx(_.isEmpty(item.name) && classes.stepLabel)}
                  key={`step-label-${item.name}`}
                  optional={item.optional}
                  icon={item.icon}
                >
                  {item.name}
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    );
  }

  render() {
    const {
      steps,
      step,
      disabled,
      disableGutters,
      classes,
      className,
      isStepBelow,
      isStepAbove,
    } = this.props;
    const icon = this.useIcon();
    const stepBelow = step === 0 || disabled.indexOf(step - 1) !== -1;
    const stepAbove =
      step === steps.length - 1 || disabled.indexOf(step + 1) !== -1;
    return (
      <Toolbar
        {..._.pick(this.props, ["style"])}
        className={clsx(
          className,
          classes.toolbar,
          disableGutters && classes.disableGutters
        )}
      >
        <Button
          style={{ minWidth: icon ? 16 : 64 }}
          disabled={!isStepBelow && stepBelow}
          onClick={this.handleBack.bind(this)}
          color="secondary"
          variant="contained"
        >
          {icon ? <NavigateBeforeIcon /> : "Back"}
        </Button>
        {this.renderStepper()}
        <Button
          style={{ minWidth: icon ? 16 : 64 }}
          disabled={!isStepAbove && stepAbove}
          onClick={this.handleNext.bind(this)}
          color="secondary"
          variant="contained"
        >
          {icon ? <NavigateNextIcon /> : "Next"}
        </Button>
      </Toolbar>
    );
  }
}

MuiStepper.propTypes = {
  step: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ).isRequired,
  disabled: PropTypes.arrayOf(PropTypes.number.isRequired),
  nonLinear: PropTypes.bool,
  onStepChange: PropTypes.func,
  isStepBelow: PropTypes.bool,
  isStepAbove: PropTypes.bool,
  onStepBelow: PropTypes.func,
  onStepAbove: PropTypes.func,
};

export default withWidth()(withStyles(styles)(MuiStepper));
