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

/**
 * Get the message related to a specific fault code.
 *
 * @param {*} type one of EconimizerAIRCx or AirsideAIRCx
 * @param {*} value string or numeric fault value
 */
export const getMessage = (type, value) => {
  const message = _.get(
    messages,
    [type, _.isString(value) ? parseInt(value).toFixed(1) : value.toFixed(1)],
    `Unable to locate message for fault: ${value}`
  );
  return message;
};

export const messages = {
  EconomizerAIRCx: {
    "-1.2": "Not enough data for aggregation.",
    "-1.0": "No Diagnosis.",
    "-99.3":
      "Supply fan of the air-handling/rooftop unit is off; therefore, potential faults with the unit cannot be detected at this time.",
    "-89.2":
      "The outdoor-air and return-air temperatures are too close; therefore, a conclusive diagnostic result is not possible.",
    "-79.2": "The outdoor-air temperature value is outside the normal limits.",
    "-69.2": "The return-air temperature value is outside the normal limits.",
    "-59.2": "The mixed-air temperature value is outside the normal limits.",
    "-49.2":
      "A temperature sensor problem is detected; therefore, no other diagnostics are possible because all other diagnostics rely on accurate temperature sensing.",
    "0.0": "No temperature problem with temperature sensors is detected.",
    "0.1":
      "The outdoor-air and mixed-air temperature sensor readings are not consistent when the outdoor-air damper is fully open.",
    "1.1":
      "The mixed-air temperature value is less than both the outdoor-air and return-air temperatures; therefore, there is a temperature sensor problem.",
    "2.1":
      "The mixed-air temperature value is greater than both the outdoor-air and return-air temperatures; therefore, there is a temperature sensor problem.",
    "3.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "10.0": "The economizer is functioning as expected.",
    "11.1":
      "The conditions are favorable for economizing but the outdoor-air damper is not fully open and the mechanical cooling is active.",
    "12.1":
      "The outdoor-air damper is commanded to be fully open; however, the outdoor-air fraction is significantly lower than 100%.",
    "13.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "14.0":
      "The conditions are not favorable for running this diagnostic because cooling is not active.",
    "15.0":
      "The conditions are not favorable for running this diagnostic because conditions are not favorable for economizing.",
    "20.0": "The economizer is functioning as expected.",
    "21.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation requirement, but it is significantly above that value.",
    "23.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "25.0": "The conditions are not favorable for running this diagnostic.",
    "30.0": "The air-handling/rooftop unit is operating as expected.",
    "31.2":
      "No conclusions can be drawn because outdoor-air fraction calculation is not reliable during this time period.",
    "32.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation needs, but it is significantly above that value.",
    "33.1":
      "The air-handling/rooftop unit is bringing in excess outdoor air; this will increase heating/cooling costs.",
    "34.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation needs, but it is significantly above that value.  The air-handling/rooftop unit is bringing in excess outdoor air; this will increase heating/cooling costs.",
    "35.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "36.0": "The conditions are not favorable for running this diagnostic.",
    "40.0": "The air-handling unit/rooftop unit is operating as expected.",
    "41.2":
      "No conclusions can be drawn because outdoor-air fraction calculation is not reliable during this time period.",
    "43.1":
      "The air-handling/rooftop unit is not providing adequate ventilation air based on the outdoor-air fraction.",
    "44.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
  },
 Economizer_AIRCx: {
    "-1.2": "Not enough data for aggregation.",
    "-1.0": "No Diagnosis.",
    "-99.3":
      "Supply fan of the air-handling/rooftop unit is off; therefore, potential faults with the unit cannot be detected at this time.",
    "-89.2":
      "The outdoor-air and return-air temperatures are too close; therefore, a conclusive diagnostic result is not possible.",
    "-79.2": "The outdoor-air temperature value is outside the normal limits.",
    "-69.2": "The return-air temperature value is outside the normal limits.",
    "-59.2": "The mixed-air temperature value is outside the normal limits.",
    "-49.2":
      "A temperature sensor problem is detected; therefore, no other diagnostics are possible because all other diagnostics rely on accurate temperature sensing.",
    "0.0": "No temperature problem with temperature sensors is detected.",
    "0.1":
      "The outdoor-air and mixed-air temperature sensor readings are not consistent when the outdoor-air damper is fully open.",
    "1.1":
      "The mixed-air temperature value is less than both the outdoor-air and return-air temperatures; therefore, there is a temperature sensor problem.",
    "2.1":
      "The mixed-air temperature value is greater than both the outdoor-air and return-air temperatures; therefore, there is a temperature sensor problem.",
    "3.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "10.0": "The economizer is functioning as expected.",
    "11.1":
      "The conditions are favorable for economizing but the outdoor-air damper is not fully open and the mechanical cooling is active.",
    "12.1":
      "The outdoor-air damper is commanded to be fully open; however, the outdoor-air fraction is significantly lower than 100%.",
    "13.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "14.0":
      "The conditions are not favorable for running this diagnostic because cooling is not active.",
    "15.0":
      "The conditions are not favorable for running this diagnostic because conditions are not favorable for economizing.",
    "20.0": "The economizer is functioning as expected.",
    "21.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation requirement, but it is significantly above that value.",
    "23.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "25.0": "The conditions are not favorable for running this diagnostic.",
    "30.0": "The air-handling/rooftop unit is operating as expected.",
    "31.2":
      "No conclusions can be drawn because outdoor-air fraction calculation is not reliable during this time period.",
    "32.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation needs, but it is significantly above that value.",
    "33.1":
      "The air-handling/rooftop unit is bringing in excess outdoor air; this will increase heating/cooling costs.",
    "34.1":
      "The outdoor-air damper should be at the minimum position to meet the ventilation needs, but it is significantly above that value.  The air-handling/rooftop unit is bringing in excess outdoor air; this will increase heating/cooling costs.",
    "35.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "36.0": "The conditions are not favorable for running this diagnostic.",
    "40.0": "The air-handling unit/rooftop unit is operating as expected.",
    "41.2":
      "No conclusions can be drawn because outdoor-air fraction calculation is not reliable during this time period.",
    "43.1":
      "The air-handling/rooftop unit is not providing adequate ventilation air based on the outdoor-air fraction.",
    "44.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
  },
  AirsideAIRCx: {
    "-1.2": "Not enough data for aggregation.",
    "-1.0": "No Diagnosis",
    "-99.3":
      "The air-handling unit’s supply fan is off; therefore, potential faults for this unit cannot be detected at this time.",
    "-89.2":
      "Inconsistent or missing data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "-79.2":
      "There is insufficient data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "0.0":
      "The air-handling unit duct static set point controls are operating correctly.",
    "1.1":
      "The air-handling unit duct static pressure is significantly different from the set point.",
    "2.2":
      "The air-handling unit duct static pressure set point data is not available; therefore, this diagnostic cannot be run for this period.",
    "10.0": "The air-handler duct static pressure is not low for this period.",
    "11.1":
      "The air-handler duct static pressure is low; therefore, it may not be able to meet the zone airflow requirements (with auto-correction enabled).",
    "12.1":
      "The air-hander duct static pressure is unable to meet the zone airflow requirements, while at the maximum set point value.",
    "13.1":
      "The air-handler duct static pressure is low; therefore, it may not be able to meet the zone airflow requirements (with auto-correction disabled).",
    "14.1":
      "The air-handler duct static pressure is low, but duct static pressure set point data is not available (cannot auto-correct).",
    "15.1":
      "The air-handler duct static pressure is low, while the supply fan is running at maximum speed.",
    "20.0": "The air-handler duct static pressure is not high for this period.",
    "21.1":
      "The air-handler duct static pressure is high; this could lead to higher supply fan energy consumption and additional zone reheat (with auto-correction enabled).",
    "22.1":
      "The air-hander duct static pressure is, while the set point value is at the minimum.",
    "23.1":
      "The air-handler duct static pressure is high; this could lead to higher supply fan energy consumption and additional zone reheat (with auto-correction disabled).",
    "24.1":
      "The air-handler duct static pressure is high, but duct static pressure set point data is not available (cannot autocorrect).",
    "25.1":
      "The air-handler duct static pressure is high, while the supply fan is running at minimum speed.",
    "30.0":
      "The air-hander supply-air temperature set point controls are operating correctly.",
    "31.1":
      "The air-handler supply-air temperature set point controls is significantly different from the set point.",
    "32.2":
      "The air-handler supply-air temperature set point data is not available; therefore, this diagnostic cannot be run for this period.",
    "40.0":
      "The air-handler supply-air temperature is not low for this period.",
    "41.1":
      "The air-handler supply-air temperature is low; this could result in zone over cooling or excess reheat (with auto-correction enabled).",
    "42.1":
      "The air-hander supply-air temperature is low, while it is at the maximum set point value.",
    "43.1":
      "The air-handler supply-air temperature is low; this could result in zone over cooling or excess reheat (with auto-correction disabled).",
    "44.1":
      "The air-handler supply-air temperature is low, but supply-air temperature set point data is not available (cannot auto-correct).",
    "50.0":
      "The air-handler supply-air temperature is not high for this period.",
    "51.1":
      "The air-handler supply-air temperature is high; this could result in zone over heating (with auto-correction enabled).",
    "52.1":
      "The air-hander supply-air temperature is high, while it is at the minimum set point value.",
    "53.1":
      "The air-handler supply-air temperature is high; this could result in zone over heating (with auto-correction disabled).",
    "54.1":
      "The air-handler supply-air temperature is high, but supply-air temperature set point data is not available (cannot auto-correct).",
    "60.0": "No schedule problems is detected for this period.",
    "61.2":
      "There is insufficient data; therefore, potential opportunity for operational improvements cannot be detected at this time.",
    "63.1":
      "The system is ON for a significant amount of time during the unoccupied period",
    "64.2":
      "The system status shows the unit is OFF but the static pressure reading is high.",
    "70.0":
      "The air-handler static pressure is being reset for this time period.",
    "71.1":
      "No air-handler static pressure reset is detected for this time period; this may result in excess energy consumption. Static pressure reset can save significant energy.",
    "80.0":
      "The air-handler supply-air temperature is being reset for this time period.",
    "81.1":
      "No air-handler supply-air temperature reset is detected for this time period; this may result in excess energy consumption. Supply-air temperature reset can save significant energy.",
  },
};
