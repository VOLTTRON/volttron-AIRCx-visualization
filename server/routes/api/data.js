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

const router = require("express").Router();
const auth = require("../auth");
const axios = require("axios");
const moment = require("moment-timezone");
const validation = require("../../data/validation");
const util = require("../../utils/util");
const _ = require("lodash");
const { loggers } = require("winston");
const logger = loggers.get("default");
require("dotenv").config();

const pattern_diagnostics = /^(?:(?:record)\/(Economizer_?AIRCx|Airside_?AIRCx)\/)([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)/i;
const pattern_detailed = /^(?:[a-zA-Z0-9 _-]+\/){3}(?:([a-zA-Z0-9 _-]+)|([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+))$/i;
const pattern_clean_data = /[\"']*{(?:[\"'](low|normal|high)[\"']:\s?([\d.\-]+)(?:,\s)?)(?:[\"'](low|normal|high)[\"']:\s?([\d.\-]+)(?:,\s)?)(?:[\"'](low|normal|high)[\"']:\s?([\d.\-]+)(?:,\s)?)}[\"']*/i;
const conversion = new RegExp(process.env.POINT_MAPPING_CONVERSION_REGEX);
const login = util.parseBoolean(process.env.REQUIRE_AUTHENTICATION);

let handleData = (clean, parse) => {
  if (clean) {
    return (value) => {
      if (_.isString(value)) {
        try {
          const r = pattern_clean_data.exec(value);
          const t = JSON.parse(
            `{"${r[1]}": ${r[2]}, "${r[3]}": ${r[4]}, "${r[5]}": ${r[6]}}`
          );
          return t;
        } catch (e) {
          logger.info(`[${e.message}] Unable to parse the value: ${value}`);
        }
      }
      return value;
    };
  } else if (parse) {
    return (value) => JSON.parse(value);
  } else {
    return (value) => value;
  }
};
handleData = handleData(
  util.parseBoolean(process.env.CLEAN_DATA),
  util.parseBoolean(process.env.PARSE_DATA)
);

var token = null;
const authenticate = () => {
  axios
    .post(`${process.env.HISTORIAN_ADDRESS}/authenticate`, {
      username: `${process.env.HISTORIAN_USERNAME}`,
      password: `${process.env.HISTORIAN_PASSWORD}`,
    })
    .then((response) => {
      token = response.data;
    })
    .catch((error) => {
      logger.error(error.message);
    });
};
authenticate();

const getTimezone = (body) => {
  if (_.isEmpty(process.env.DEFAULT_TIMEZONE)) {
    return undefined;
  }
  const { site, campus, building, device, unit, diagnostic, analysis } = body;
  const path = [
    diagnostic ? diagnostic : analysis,
    site ? site : campus,
    building,
    device ? device : unit,
  ];
  let timezone = _.get(
    validation,
    [...path.slice(0, path.length), "timezone"],
    process.env.DEFAULT_TIMEZONE
  );
  if (timezone) {
    timezone = moment()
      .tz(timezone)
      .tz();
  }
  logger.debug(`Using timezone ${timezone} for ${JSON.stringify(path)}`);
  return timezone;
};

const getUtcOffset = (body) => {
  if (_.isEmpty(process.env.DEFAULT_UTC_OFFSET)) {
    return undefined;
  }
  const { site, campus, building, device, unit, diagnostic, analysis } = body;
  const path = [
    diagnostic ? diagnostic : analysis,
    site ? site : campus,
    building,
    device ? device : unit,
  ];
  const offset = _.get(
    validation,
    [...path.slice(0, path.length), "utc_offset"],
    process.env.DEFAULT_UTC_OFFSET
  );
  logger.debug(`Using UTC offset of ${offset} for ${JSON.stringify(path)}`);
  return offset;
};

const createOffset = (timezone, utcOffset) => (v) => {
  if (timezone) {
    return v.tz(timezone);
  } else if (utcOffset) {
    return v.utcOffset(utcOffset);
  } else {
    return v;
  }
};

// get data sources
router.get(
  "/sources",
  login ? auth.required : auth.optional,
  (req, res, next) => {
    axios
      .all([
        axios.post(
          `${process.env.HISTORIAN_ADDRESS}/${process.env.HISTORIAN_API}`,
          {
            jsonrpc: "2.0",
            id: !_.isEmpty(process.env.HISTORIAN_ANALYSIS_ID)
              ? process.env.HISTORIAN_ANALYSIS_ID
              : "analysis.historian",
            method: "get_topic_list",
            params: {
              authentication: `${token}`,
            },
          }
        ),
        // we're constructing these topics manually
        // axios.post(`${process.env.HISTORIAN_ADDRESS}/${process.env.HISTORIAN_API}`, {
        //   jsonrpc: "2.0",
        //   id: "data.historian",
        //   method: "get_topic_list",
        //   params: {
        //     authentication: `${token}`,
        //   },
        // }),
      ])
      .then(
        axios.spread((...responses) => {
          const result = {};
          responses.forEach((response) => {
            const error = _.get(response, ["data", "error"]);
            if (error) {
              throw Error(error.message);
            }
            _.get(response, ["data", "result"], []).forEach((d) => {
              let path = _.slice(pattern_diagnostics.exec(d), 1);
              const type = path[path.length - 1];
              path = _.slice(path, 0, path.length - 1);
              if (path.length === 5) {
                switch (type) {
                  case "diagnostic message":
                    _.set(result, [...path, "diagnostics"], d);
                    break;
                  case "energy impact":
                    _.set(result, [...path, "energyImpact"], d);
                    break;
                  default:
                    logger.warn(
                      `Unknown topic type found in sources data: ${type}`
                    );
                }
                const points = Object.entries(
                  _.get(
                    validation,
                    [
                      ...path.slice(0, path.length - 1),
                      "arguments",
                      "point_mapping",
                    ],
                    {}
                  )
                );
                _.set(
                  result,
                  [...path, "detailed"],
                  points.map(
                    ([k, t]) => `${path[1]}/${path[2]}/${path[3]}/${t}`
                  )
                );
                _.get(
                  validation,
                  [
                    ...path.slice(0, path.length - 1),
                    "device",
                    "unit",
                    path[3],
                    "subdevices",
                  ],
                  []
                ).forEach((d) => {
                  _.set(
                    result,
                    [...path, "subdevices", d],
                    points.map(
                      ([k, t]) => `${path[1]}/${path[2]}/${path[3]}/${d}/${t}`
                    )
                  );
                });
                _.set(
                  result,
                  [...path, "conversion"],
                  points
                    .filter(
                      ([k, t]) => k.match(conversion) || t.match(conversion)
                    )
                    .map(([k, t]) => t)
                );
                _.set(
                  result,
                  [...path, "utcOffset"],
                  _.get(
                    validation,
                    [...path.slice(0, path.length - 1), "utc_offset"],
                    process.env.DEFAULT_UTC_OFFSET
                  )
                );
              }
            });
          });
          return res.status(200).json(result);
        })
      )
      .catch((error) => {
        logger.error(error.message);
        return res.status(500).json(error.message);
      });
  }
);

// get detailed historian data
router.post(
  "/detailed",
  login ? auth.required : auth.optional,
  (req, res, next) => {
    const { topic, start, end } = req.body;
    const offset = createOffset(getTimezone(req.body), getUtcOffset(req.body));
    const range = moment(end).diff(moment(start), "hours");
    const chunks = topic.length <= 6 ? 6 : 24;
    const span = Math.ceil(range / chunks);
    logger.debug(
      JSON.stringify({
        start,
        end,
        range,
        chunks,
        span: `${span} hours`,
        topic,
      })
    );
    if (range > 25) {
      return res
        .status(400)
        .json("Request time span cannot be greater than a day.");
    }
    if (range < 0) {
      return res.status(400).json("Request end time must be after start time.");
    }
    axios
      .all(
        _.range(0, chunks).map((v) => {
          // the historian doesn't seem to handle time zones
          const range = {
            start: offset(
              moment.min(moment(start).add(v * span, "hours"), moment(end))
            )
              .utc()
              .format("YYYY-MM-DD HH:mm:ss"),
            end: offset(
              moment.min(
                moment(start).add((v + 1) * span, "hours"),
                moment(end)
              )
            )
              .utc()
              .format("YYYY-MM-DD HH:mm:ss"),
          };
          logger.debug(
            `Submitting query for the UTC date range: ${JSON.stringify(range)}`
          );
          return axios.post(
            `${process.env.HISTORIAN_ADDRESS}/${process.env.HISTORIAN_API}`,
            {
              jsonrpc: "2.0",
              id: !_.isEmpty(process.env.HISTORIAN_DATA_ID)
                ? process.env.HISTORIAN_DATA_ID
                : "analysis.historian",
              method: "query",
              params: {
                authentication: `${token}`,
                topic: topic,
                count: 1000,
                start: range.start,
                end: range.end,
              },
            }
          );
        })
      )
      .then(
        axios.spread((...responses) => {
          const result = {};
          responses.forEach((response) => {
            const error = _.get(response, ["data", "error"]);
            if (error) {
              throw Error(error.message);
            }
            Object.entries(
              _.get(response, ["data", "result", "values"], {})
            ).forEach(([k, v]) => {
              const groups = pattern_detailed.exec(k);
              const key = groups[1]
                ? ["detailed", groups[1]]
                : ["subdevices", groups[3], groups[2]];
              v.forEach((e) => {
                e[0] = offset(moment(e[0])).format("YYYY-MM-DD HH:mm:ss");
                e[1] = handleData(e[1]);
              });
              _.set(result, key, _.concat(_.get(result, key, []), v));
            });
          });
          return res.status(200).json(result);
        })
      )
      .catch((error) => {
        logger.error(error.message);
        return res.status(500).json(error.message);
      });
  }
);

// get diagnostics historian data
router.post(
  "/diagnostics",
  login ? auth.required : auth.optional,
  (req, res, next) => {
    const { topic, start, end } = req.body;
    const offset = createOffset(getTimezone(req.body), getUtcOffset(req.body));
    const range = moment(end).diff(moment(start), "days") + 1;
    const chunks = range <= 7 ? 1 : Math.ceil(range / 7);
    const span = Math.ceil(range / chunks);
    logger.debug(
      JSON.stringify({ start, end, range, chunks, span: `${span} days`, topic })
    );
    if (range > 367) {
      return res
        .status(400)
        .json("Request time span cannot be greater than a year.");
    }
    if (span < 0) {
      return res.status(400).json("Request end time must be after start time.");
    }
    axios
      .all(
        _.range(0, chunks).map((v) => {
          // the historian doesn't seem to handle time zones
          const range = {
            start: offset(moment(start).add(v * span, "days"))
              .utc()
              .format("YYYY-MM-DD HH:mm:ss"),
            end: offset(
              moment.min(moment(start).add((v + 1) * span, "days"), moment(end))
            )
              .utc()
              .format("YYYY-MM-DD HH:mm:ss"),
          };
          logger.debug(
            `Submitting query for the UTC date range: ${JSON.stringify(range)}`
          );
          return axios.post(
            `${process.env.HISTORIAN_ADDRESS}/${process.env.HISTORIAN_API}`,
            {
              jsonrpc: "2.0",
              id: !_.isEmpty(process.env.HISTORIAN_ANALYSIS_ID)
                ? process.env.HISTORIAN_ANALYSIS_ID
                : "analysis.historian",
              method: "query",
              params: {
                authentication: `${token}`,
                topic: topic,
                count: 1000,
                start: range.start,
                end: range.end,
              },
            }
          );
        })
      )
      .then(
        axios.spread((...responses) => {
          const result = {};
          responses.forEach((response) => {
            const error = _.get(response, ["data", "error"]);
            if (error) {
              throw Error(error.message);
            }
            Object.entries(
              _.get(response, ["data", "result", "values"], {})
            ).forEach(([k, v]) => {
              const key = _.slice(pattern_diagnostics.exec(k), 5, 6);
              v.forEach((e) => {
                e[0] = offset(moment(e[0])).format("YYYY-MM-DD HH:mm:ss");
                e[1] = handleData(e[1]);
              });
              _.set(result, key, _.concat(_.get(result, key, []), v));
            });
          });
          return res.status(200).json(result);
        })
      )
      .catch((error) => {
        logger.error(error.message);
        return res.status(500).json(error.message);
      });
  }
);

module.exports = router;
