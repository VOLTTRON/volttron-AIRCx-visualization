"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { loggers } = require("winston");
const logger = loggers.get("default");
const basename = path.basename(__filename);

async function* getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

const temp = {};
(async () => {
  for await (const file of getFiles(
    path.join(process.cwd(), "data/validation")
  )) {
    if (
      !(
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js"
      )
    ) {
      try {
        const data = JSON.parse(fs.readFileSync(file));
        const campus = _.get(data, ["device", "campus"]);
        const building = _.get(data, ["device", "building"]);
        const units = Object.keys(_.get(data, ["device", "unit"], {}));
        const analysis = _.get(data, "analysis_name");
        const paths = units.map((unit) => [analysis, campus, building, unit]);
        paths.forEach((path) => {
          _.set(temp, path, data);
        });
      } catch (error) {
        logger.warn(
          `Could not process validation file "${file}" because of "${
            error.message
          }"`
        );
      }
    }
  }
})();

module.exports = temp;
