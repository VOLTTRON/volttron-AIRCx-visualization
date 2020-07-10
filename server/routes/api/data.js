const router = require("express").Router();
const auth = require("../auth");
const axios = require("axios");
const moment = require("moment");
const validation = require("../../data/validation");
const _ = require("lodash");
const { loggers } = require("winston");
const logger = loggers.get("default");
require("dotenv").config();

const pattern_diagnostics = /^(?:(?:record)\/(EconomizerAIRCx|AirsideAIRCx)\/)([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)/i;
const pattern_detailed = /^(?:[a-zA-Z0-9 _-]+\/)*([a-zA-Z0-9 _-]+)$/i;

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
      logger.error(error);
    });
};
authenticate();

const getUtcOffset = (body) => {
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

// get data sources
router.get("/sources", auth.optional, (req, res, next) => {
  axios
    .all([
      axios.post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
        jsonrpc: "2.0",
        id: "analysis.historian",
        method: "get_topic_list",
        params: {
          authentication: `${token}`,
        },
      }),
      // we're constructing these topics manually
      // axios.post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
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
          _.get(response, ["data", "result"], []).forEach((d) => {
            const path = _.slice(pattern_diagnostics.exec(d), 1);
            if (path.length === 5) {
              _.set(result, [...path, "diagnostics"], d);
              _.set(
                result,
                [...path, "detailed"],
                Object.values(
                  _.get(
                    validation,
                    [
                      ...path.slice(0, path.length - 1),
                      "arguments",
                      "point_mapping",
                    ],
                    {}
                  )
                ).map((t) => `${path[1]}/${path[2]}/${path[3]}/${t}`)
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
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

// get detailed historian data
router.post("/detailed", auth.optional, (req, res, next) => {
  const { topic, start, end } = req.body;
  const offset = getUtcOffset(req.body);
  const range = moment(end).diff(moment(start), "hours");
  const chunks = range <= 6 ? 1 : Math.ceil(range / 6);
  const span = Math.ceil(range / chunks);
  logger.debug(JSON.stringify({ range, chunks, span: `${span} hours`, topic }));
  if (span > 25) {
    return res
      .status(400)
      .json("Request time span cannot be greater than a day.");
  }
  if (span <= 0) {
    return res.status(400).json("Request end time must be after start time.");
  }
  axios
    .all(
      _.range(0, chunks).map((v) => {
        // the historian doesn't seem to handle time zones
        const range = {
          start: moment
            .min(moment(start).add(v * span, "hours"), moment(end))
            .utcOffset(offset)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss"),
          end: moment
            .min(moment(start).add((v + 1) * span, "hours"), moment(end))
            .utcOffset(offset)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss"),
        };
        logger.debug(range);
        return axios.post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
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
        });
      })
    )
    .then(
      axios.spread((...responses) => {
        const result = {};
        responses.forEach((response) => {
          Object.entries(
            _.get(response, ["data", "result", "values"], {})
          ).forEach(([k, v]) => {
            const key = _.get(pattern_detailed.exec(k), "1");
            v.forEach(
              (e) =>
                (e[0] = moment(e[0])
                  .utcOffset(offset)
                  .format("YYYY-MM-DD HH:mm:ss"))
            );
            _.set(result, key, _.concat(_.get(result, key, []), v));
          });
        });
        return res.status(200).json(result);
      })
    )
    .catch((error) => {
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

// get diagnostics historian data
router.post("/diagnostics", auth.optional, (req, res, next) => {
  const { topic, start, end } = req.body;
  const offset = getUtcOffset(req.body);
  const range = moment(end)
    .endOf("day")
    .diff(moment(start), "days");
  const chunks = range <= 7 ? 1 : Math.ceil(range / 7);
  const span = Math.ceil(range / chunks);
  logger.debug(JSON.stringify({ range, chunks, span: `${span} days`, topic }));
  if (range > 366) {
    return res
      .status(400)
      .json("Request time span cannot be greater than a year.");
  }
  if (span <= 0) {
    return res.status(400).json("Request end time must be after start time.");
  }
  axios
    .all(
      _.range(0, chunks).map((v) => {
        // the historian doesn't seem to handle time zones
        const range = {
          start: moment
            .min(moment(start).add(v * span, "days"), moment(end).endOf("day"))
            .utcOffset(offset)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss"),
          end: moment
            .min(
              moment(start).add((v + 1) * span, "days"),
              moment(end).endOf("day")
            )
            .utcOffset(offset)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss"),
        };
        logger.debug(range);
        return axios.post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
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
        });
      })
    )
    .then(
      axios.spread((...responses) => {
        const result = {};
        responses.forEach((response) => {
          Object.entries(
            _.get(response, ["data", "result", "values"], {})
          ).forEach(([k, v]) => {
            const key = _.slice(pattern_diagnostics.exec(k), 5);
            v.forEach(
              (e) =>
                (e[0] = moment(e[0])
                  .utcOffset(offset)
                  .format("YYYY-MM-DD HH:mm:ss"))
            );
            _.set(result, key, _.concat(_.get(result, key, []), v));
          });
        });
        return res.status(200).json(result);
      })
    )
    .catch((error) => {
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

module.exports = router;
