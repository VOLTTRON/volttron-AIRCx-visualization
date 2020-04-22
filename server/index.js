const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
const winston = require("winston");
const expressWinston = require("express-winston");
const models = require("./models");
const path = require("path");
const util = require("./utils/util");
require("dotenv").config();

const publicKey = fs.readFileSync(
  path.join(process.cwd(), process.env.PUBLIC_KEY)
);

/* Make all variables from our .env file available in our process */
require("dotenv").config();

/* Init express */
let app = express();

/* Here we setup the middleware logging */
const desc = {
  transports: [
    new winston.transports.Console({ level: process.env.LOG_CONSOLE }),
    new winston.transports.File({
      filename: "server.log",
      level: process.env.LOG_FILE,
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function(req, res) {
    return false;
  }, // optional: allows to skip some log messages based on request and/or response
};
winston.loggers.add("default", desc);
app.use(expressWinston.logger(desc));
// expressWinston.requestWhitelist.push("body"); // logging the body of messages should only be done during testing

/* Here we setup the middlewares & configs */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: publicKey,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function(err, req, res, next) {
  if (err.code === "permission_denied") {
    res.status(403).send("Forbidden");
  }
});
require("./config/passport");

/* static public files hosting */
app.use(express.static(path.join(process.cwd(), "public")));

/* Here we define the api routes */
app.use(require("./routes"));

/* Here we define the error handling */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res
    .status(err.status ? err.status : 500)
    .send(err.message ? err.message : "Internal Server Error");
});

/* Here we setup the https certs if enabled */
if (util.parseBoolean(process.env.HTTPS)) {
  app = https.createServer(
    {
      key: fs.readFileSync(process.env.SERVER_KEY),
      cert: fs.readFileSync(process.env.SERVER_CERT),
    },
    app
  );
}

/* Create everything automatically with sequelize ORM */
models.sequelize.sync().then(function() {
  const port = process.env.SERVER_PORT || 3000;
  const address = process.env.SERVER_ADDRESS || "127.0.0.1";
  app.listen(port, address, () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        `Server running on http${
          util.parseBoolean(process.env.HTTPS) ? "s" : ""
        }://${address}:${port}`
      );
    }
  });
});

module.exports = app;
