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

import filters from "constants/filters";
import {
  black,
  error,
  gray,
  info,
  primary,
  verified,
  warning,
} from "constants/palette";
import _ from "lodash";
import moment from "moment";
import { createPadding } from "utils/layout";

const colors = [
  error,
  warning,
  info,
  verified,
  primary,
  "purple",
  "hotpink",
  gray,
  black,
  "lightcoral",
  "lightsalmon",
  "lightgreen",
  "lightskyblue",
  "mediumpurple",
];

const createScatterUpdate = (data, request, result) => {
  const { labels } = result;
  const { topic } = request ? request : {};
  const conversion = _.get(topic, ["0", "conversion"], []);
  const detailed = _.get(data, ["detailed"], {});
  const keys = Object.keys(detailed);
  const values = Object.values(detailed);
  const scatter = _.concat(
    values.map((d, i) => {
      return {
        x: [_.get(d, ["0", "0"])],
        y: [_.get(d, ["0", "1"])],
        legendgroup: labels[i].acronym,
        showlegend: true,
        hoverinfo: "skip",
        name: keys.length > 2 ? labels[i].acronym : labels[i].label,
        type: "scatter",
        mode: "lines",
        line: { shape: "spline", color: colors[i], size: 3, width: 3 },
      };
    }),
    values.map((d, i) => {
      const k = keys[i];
      const multiplier = conversion.includes(k) ? 10.0 : 1.0;
      return {
        x: d.map((v) => v[0]),
        y: d.map((v) => v[1] * multiplier),
        legendgroup: labels[i].acronym,
        showlegend: false,
        name: labels[i].label,
        type: "scatter",
        mode: "lines",
        line: { shape: "spline", color: colors[i], size: 3, width: 3 },
      };
    })
  );
  return { scatter };
};

const createBoxUpdate = (data, request, filter, result) => {
  const { labels, offset } = result;
  const { topic } = request ? request : {};
  const conversion = _.get(topic, ["0", "conversion"], []);
  const subdevices = _.get(data, ["subdevices"], {});
  const keys = Object.keys(subdevices);
  const values = Object.values(subdevices);
  const map = {};
  const box = _.concat(
    ...values.map((d, i) => {
      const l = labels[offset + i];
      const c = colors[offset + i];
      return {
        x: l.acronym,
        y: [0],
        legendgroup: l.acronym,
        showlegend: true,
        hoverinfo: "skip",
        name: keys.length > 2 ? l.acronym : l.label,
        type: "scatter",
        mode: "lines",
        // visible: i > 0 ? "legendonly" : true,
        marker: {
          shape: "spline",
          color: c,
          size: 3,
          width: 3,
        },
      };
    }),
    ..._.range(0, 24).map((r) =>
      values.map((d, i) => {
        const k = keys[i];
        const l = labels[offset + i];
        const c = colors[offset + i];
        const temp = {
          x: l.acronym,
          y: [],
          legendgroup: l.acronym,
          showlegend: false,
          name: `${r}:00 - ${r}:59`,
          type: "box",
          boxmean: "sd",
          // visible: i > 0 ? "legendonly" : true,
          marker: { color: c },
        };
        _.set(map, [k, r], temp);
        return temp;
      })
    )
  );
  values.forEach((d, i) => {
    const k = keys[i];
    const multiplier = conversion.includes(k) ? 10.0 : 1.0;
    _.concat(
      ...Object.entries(d)
        .filter(([k, v]) => (filter ? !filter.includes(k) : true))
        .map(([k, v]) => v)
    ).forEach((v) => {
      const h = moment(v[0]).hour();
      const a = v[1] * multiplier;
      _.get(map, [k, h, "y"]).push(a);
    });
  });
  return { box };
};

const createRangesUpdate = (data, form, result) => {
  const { start, min, max } = result;
  const sensitivity = _.get(form, "sensitivity", "normal");
  const keys = Object.keys(data);
  const values = Object.values(data);
  const ranges = values
    .map((v, i) => {
      const k = keys[i];
      const temp = { filters: [] };
      const values = v
        .map((i) => ({
          filter: filters.getType(i[sensitivity]),
          value: i[sensitivity],
        }))
        .filter((i) => i.filter);
      if (values.length === 0) {
        return null;
      }
      filters.values.forEach((filter) => {
        const value = _.find(values, { filter });
        if (value) {
          temp.filters.push(filter);
          return;
        }
      });
      const filter = _.get(temp, ["filters", "0"]);
      return {
        type: "rect",
        xref: "x",
        yref: "y",
        x0: moment(start)
          .hour(parseInt(k))
          .format(),
        y0: min,
        x1: moment(start)
          .hour(parseInt(k))
          .add(1, "hour")
          .format(),
        y1: max,
        fillcolor: _.get(filter, ["color"], primary),
        opacity: 0.2,
        line: {
          width: 0,
        },
      };
    })
    .filter((v) => v);
  return { ranges };
};

export const transmogrifyDetailedUtil = (
  diagnostics,
  data,
  form,
  request,
  type,
  filter,
  path
) => {
  const { start, end } = request ? request : {};
  const diagnostic = _.get(diagnostics, path, {});
  const detailed = _.get(data, ["detailed"], {});
  const subdevices = _.get(data, ["subdevices"], {});
  const keys = {
    detailed: Object.keys(detailed),
    subdevices: Object.keys(subdevices),
  };
  const offset = keys.detailed.length;
  const values = _.concat(
    _.concat(...Object.values(detailed)).map((v) => v[1]),
    _.concat(
      ...Object.values(subdevices).map((v) => _.concat(...Object.values(v)))
    ).map((v) => v[1])
  );
  const labels = _.concat(keys.detailed, keys.subdevices).map((l, i) => {
    const y =
      i < keys.detailed.length ? _.get(detailed[l].slice(-1).pop(), "1", 0) : 0;
    const v = i < keys.detailed.length ? detailed[l].length > 0 : false;
    return {
      i: i,
      x: end,
      y: y,
      label: l.replace(/([A-Z]+)/g, " $1").trim(),
      acronym: l.replace(/[a-z]+/g, "").trim(),
      abbr: l.trim().slice(0, 1),
      valid: v,
    };
  });
  const show = !_.isEmpty(values);
  const min = (show ? _.min(values) : 0) - 10;
  const max = (show ? _.max(values) : 0) + 10;
  const padding = (max - min) / 30;
  const ys = createPadding(
    labels.map((v) => v.y),
    min,
    max,
    padding
  );
  const result = {
    start,
    end,
    min,
    max,
    ys,
    padding,
    labels,
    colors,
    offset,
    show,
  };
  switch (type) {
    case "primary":
      _.merge(result, createScatterUpdate(data, request, result));
      _.merge(result, createRangesUpdate(diagnostic, form, result));
      break;
    case "secondary":
      _.merge(result, createBoxUpdate(data, request, filter, result));
      break;
    default:
  }
  return result;
};
