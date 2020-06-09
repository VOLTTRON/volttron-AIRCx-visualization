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
  axios
    .all(
      _.range(0, 4).map((v) => {
        return axios.post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
          jsonrpc: "2.0",
          id: "data.historian",
          method: "query",
          params: {
            authentication: `${token}`,
            count: 1000,
            topic: topic,
            start: moment(start)
              .add(v * 6, "hours")
              .format("YYYY-MM-DDTHH:mm:ss"),
            end: moment(end)
              .subtract((3 - v) * 6, "hours")
              .format("YYYY-MM-DDTHH:mm:ss"),
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
  axios
    .post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
      jsonrpc: "2.0",
      id: "analysis.historian",
      method: "query",
      params: {
        authentication: `${token}`,
        topic: topic,
        start: moment(start).format("YYYY-MM-DDTHH:mm:ss"),
        end: moment(end).format("YYYY-MM-DDTHH:mm:ss"),
      },
    })
    .then((response) => {
      const result = {};
      Object.entries(_.get(response, ["data", "result", "values"], {})).forEach(
        ([k, v]) => {
          _.set(result, _.slice(pattern_diagnostics.exec(k), 5), v);
        }
      );
      return res.status(200).json(result);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

module.exports = router;
