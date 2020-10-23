// Copyright (c) 2020, Battelle Memorial Institute
// All rights reserved.

// 1.  Battelle Memorial Institute (hereinafter Battelle) hereby grants
//     permission to any person or entity lawfully obtaining a copy of this
//     software and associated documentation files (hereinafter "the Software")
//     to redistribute and use the Software in source and binary forms, with or
//     without modification.  Such person or entity may use, copy, modify, merge,
//     publish, distribute, sublicense, and/or sell copies of the Software, and
//     may permit others to do so, subject to the following conditions:

//     -   Redistributions of source code must retain the above copyright notice,
//         this list of conditions and the following disclaimers.

//     -          Redistributions in binary form must reproduce the above copyright
//         notice, this list of conditions and the following disclaimer in the
//         documentation and/or other materials provided with the distribution.

//     -          Other than as used herein, neither the name Battelle Memorial Institute
//         or Battelle may be used in any form whatsoever without the express
//         written consent of Battelle.

// 2. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//     AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//     IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//     ARE DISCLAIMED. IN NO EVENT SHALL BATTELLE OR CONTRIBUTORS BE LIABLE FOR
//     ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
//     DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
//     SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
//     CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
//     LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
//     OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
//     DAMAGE.

// The views and conclusions contained in the software and documentation are those
// of the authors and should not be interpreted as representing official policies,
// either expressed or implied, of the FreeBSD Project.

// This material was prepared as an account of work sponsored by an agency of the
// United States Government. Neither the United States Government nor the United
// States Department of Energy, nor Battelle, nor any of their employees, nor any
// jurisdiction or organization that has cooperated in the development of these
// materials, makes any warranty, express or implied, or assumes any legal
// liability or responsibility for the accuracy, completeness, or usefulness or
// any information, apparatus, product, software, or process disclosed, or
// represents that its use would not infringe privately owned rights.

// Reference herein to any specific commercial product, process, or service by
// trade name, trademark, manufacturer, or otherwise does not necessarily
// constitute or imply its endorsement, recommendation, or favoring by the
// United States Government or any agency thereof, or Battelle Memorial Institute.
// The views and opinions of authors expressed herein do not necessarily state or
// reflect those of the United States Government or any agency thereof.

// PACIFIC NORTHWEST NATIONAL LABORATORY
// operated by
// BATTELLE for the UNITED STATES DEPARTMENT OF ENERGY
// under Contract DE-AC05-76RL01830

import {
  Button,
  MenuItem,
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
import { MuiSelect } from "components";
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

  renderSelect() {
    const { steps, step, header, classes } = this.props;
    const { handleStepChange } = this;
    return (
      <div className={classes.select}>
        <MuiSelect
          id="select"
          header={header}
          value={step}
          onChange={(e, v) => handleStepChange(_.get(e, "target.value", v))()}
          renderValue={(v) => {
            console.log(v);
            return _.get(steps, [v, "label"], v);
          }}
        >
          {steps.map(function(item, index) {
            return (
              <MenuItem key={`item-${item.label}`} value={index}>
                {item.label}
              </MenuItem>
            );
          })}
        </MuiSelect>
      </div>
    );
  }

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
      variant,
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
          disableGutters && classes.disableGutters,
          variant === "compact" && classes.compactToolbar
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
        {variant === "compact" ? this.renderSelect() : this.renderStepper()}
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
  header: PropTypes.string,
  variant: PropTypes.oneOf(["compact", "default", undefined]),
  onStepChange: PropTypes.func,
  isStepBelow: PropTypes.bool,
  isStepAbove: PropTypes.bool,
  onStepBelow: PropTypes.func,
  onStepAbove: PropTypes.func,
};

export default withWidth()(withStyles(styles)(MuiStepper));
