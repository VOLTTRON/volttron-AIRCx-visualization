const router = require("express").Router();
const auth = require("../auth");
const axios = require("axios");
const _ = require("lodash");
const { loggers } = require("winston");
const logger = loggers.get("default");
require("dotenv").config();

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
    .post(`${process.env.HISTORIAN_ADDRESS}/jsonrpc`, {
      jsonrpc: "2.0",
      id: "analysis.historian",
      method: "get_topic_list",
      params: {
        authentication: `${token}`,
      },
    })
    .then((response) => {
      const result = {};
      _.get(response, ["data", "result"], []).forEach((d) => {
        _.set(
          result,
          _.slice(
            /^(?:record)\/(EconomizerAIRCx|AirsideAIRCx)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)\/([a-zA-Z0-9 _-]+)/i.exec(
              d
            ),
            1
          ),
          d
        );
      });
      return res.status(200).json(result);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

// get diagnostics data
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
        start: start,
        end: end,
      },
    })
    .then((response) => {
      const result = _.get(response, ["data", "result", "values"], {});
      return res.status(200).json(result);
    })
    .catch((error) => {
      logger.error(error);
      return res.status(500).json(error.message);
    });
});

module.exports = router;
