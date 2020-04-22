const router = require("express").Router();
const auth = require("../auth");
const fs = require("fs");
const path = require("path");
const { loggers } = require("winston");
const logger = loggers.get("default");
require("dotenv").config();

// get data sources
router.get("/sources", auth.optional, (req, res, next) => {
  fs.readFile(path.join(process.cwd(), "data/sources.json"), (err, data) => {
    if (err) {
      return res.status(400).json(err.message);
    }
    const json = JSON.parse(data);
    return res.status(200).json(json);
  });
});

module.exports = router;
