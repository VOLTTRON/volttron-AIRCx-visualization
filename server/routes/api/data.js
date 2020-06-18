const router = require("express").Router();
const auth = require("../auth");
const axios = require("axios");
const moment = require("moment");
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
            _.set(result, path, d);
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
        const range = {
          start: moment
            .min(moment(start).add(v * span, "hours"), moment(end))
            .format("YYYY-MM-DD HH:mm:ss"),
          end: moment
            .min(moment(start).add((v + 1) * span, "hours"), moment(end))
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
        const range = {
          start: moment
            .min(moment(start).add(v * span, "days"), moment(end).endOf("day"))
            .format("YYYY-MM-DD HH:mm:ss"),
          end: moment
            .min(
              moment(start).add((v + 1) * span, "days"),
              moment(end).endOf("day")
            )
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
