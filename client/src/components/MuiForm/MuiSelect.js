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

import { FormControl, Select, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { dark } from "constants/palette";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { ConditionalWrapper } from "utils/utils";
import MuiLabel from "./MuiLabel";
import styles from "./styles";

const handleRenderValue = (props) => (value) => {
  const { classes, header, placeholder, multiple, renderValue } = props;
  if ((_.isString(value) || _.isArray(value)) && _.isEmpty(value)) {
    if (!_.isEmpty(placeholder) && _.isEmpty(header)) {
      return (
        <div className={classes.value}>
          <Typography style={{ color: dark }}>{placeholder}</Typography>
        </div>
      );
    } else {
      return null;
    }
  } else if (multiple) {
    return (
      <div className={classes.value}>
        <Typography>
          {value.length > 0
            ? renderValue
              ? renderValue(value[0])
              : value[0]
            : ""}
        </Typography>
        <Typography>{value.length > 1 && `+${value.length - 1}`}</Typography>
      </div>
    );
  } else {
    return (
      <div className={classes.value}>
        <Typography>{renderValue ? renderValue(value) : value}</Typography>
      </div>
    );
  }
};

const MuiSelect = (props) => {
  const {
    classes,
    className,
    disabled,
    header,
    placeholder,
    id,
    onChange,
    value,
    fullWidth,
    multiple,
    required,
    children,
    "aria-label": ariaLabel,
  } = props;

  return (
    <ConditionalWrapper
      condition={Boolean(header)}
      wrapper={(c) => (
        <div>
          <MuiLabel header={header} required={required} />
          {c}
        </div>
      )}
    >
      <FormControl
        className={clsx(fullWidth && classes.fullWidth)}
        variant="outlined"
        size="medium"
        margin="none"
        fullWidth
      >
        <Select
          id={id}
          className={clsx(className, classes.select)}
          aria-label={ariaLabel ? ariaLabel : header ? header : placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          displayEmpty
          multiple={multiple}
          renderValue={handleRenderValue(props)}
          fullWidth
        >
          {children}
        </Select>
      </FormControl>
    </ConditionalWrapper>
  );
};

MuiSelect.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default withStyles(styles)(MuiSelect);
