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

import _ from "lodash";

// grays
export const white = "#FFFFFF";
export const lightest = "#F5F5F5";
export const lighter = "#D3D3D3";
export const light = "#A9A9A9";
export const gray = "#808080";
export const dark = "#585858";
export const darker = "#434343";
export const darkest = "#181818";
export const black = "#000000";

// colors
export const background = "#F6F8FC";
export const backgroundShade = "#454C5B";
export const primary = "#5786CD"; // primay color
export const primaryTint = "#667087"; // light primary
export const primaryShade = "#454C5B"; // dark primary
export const secondary = "#5786CD"; // bright primary
export const attention = "#5786CD"; // blue

// status
export const info = "#ffb73e"; // yellow
export const infoTint = "#ffcd79"; // light yellow
export const warning = "#f15c3e"; // orange
export const warningTint = "#f58a75"; // light orange
export const error = "#be0f34"; // red
export const errorTint = "#f15173"; // light red

// conditions
export const verified = "#01c353"; // green
export const verifiedTint = "#66db97"; // light green
export const selected = "#f87e1c"; // orange
export const selectedTint = "#fbe7d2"; // light orange
export const active = "#5786CD"; // bright primary
export const disabled = "#d8d8d8";

/**
 * Use the supplied value to derive a color representation.
 * This is not a traditional color parsing method.
 * This method is to convert values like percentage, error names, etc to a color.
 * Numbers should be on a scale of 0 to 100. Strings should be a text representation.
 *
 * @param {Number:String} value
 */
export const deriveColor = (value) => {
  if (_.isNumber(value)) {
    if (value > 90) {
      return error;
    } else if (value > 80) {
      return warning;
    } else if (value > 60) {
      return info;
    } else if (value > 40) {
      return verified;
    } else {
      return gray;
    }
  } else if (_.isString(value)) {
    const string = value.toLowerCase().replace(/[\s_-]+/, "");
    switch (string) {
      case "extreme":
      case "active":
      case "hot":
      case "donotdistribute":
        return secondary;
      case "high":
      case "error":
      case "severe":
        return error;
      case "medium":
      case "warning":
      case "warn":
      case "moderate":
        return warning;
      case "low":
      case "info":
      case "minimal":
        return info;
      case "normal":
      case "verified":
      case "routine":
      case "good":
        return verified;
      case "select":
      case "selected":
      case "selection":
        return selected;
      case "none":
      default:
        return gray;
    }
  }
};

/////////////////////////////////////////////////////////////
// Charts are the only use case for special color schemes. //
/////////////////////////////////////////////////////////////

export const faults = "#D7191C";
export const inconclusive = "#FDAE61";
export const unitOff = "#ABD9E9";
export const all = "#FFFFFF";
export const likely = "#A9A9A9";
