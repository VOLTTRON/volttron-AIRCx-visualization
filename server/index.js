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

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const https = require("https");
require("winston");
const expressWinston = require("express-winston");
const ExpressCache = require("express-cache-middleware");
const cacheManager = require("cache-manager");
const fsCacheStore = require("cache-manager-fs");
const models = require("./models");
const path = require("path");
const util = require("./utils/util");
const { logger, options } = require("./logging");
require("dotenv").config();

const publicKey = fs.readFileSync(
  path.join(process.cwd(), process.env.PUBLIC_KEY)
);

/* Init express */
let app = express();

/* Here we setup the middleware logging */
app.use(expressWinston.logger(options));
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

// setup the cache middleware
const cacheMiddleware = new ExpressCache(
  cacheManager.multiCaching([
    cacheManager.caching({
      store: "memory",
      max: 10000,
      ttl: 3600, // one hour
    }),
    cacheManager.caching({
      store: fsCacheStore,
      max: 10000,
      ttl: 86400, // one day
      path: "cache",
      zip: true,
    }),
  ]),
  {
    getCacheKey: (req) => {
      let key = undefined;
      switch (req.method) {
        case "GET":
          // cache all get requests
          key = `${req.url}`;
          break;
        case "POST":
          // cache only specific post requests
          const { topic, start, end } = req.body;
          if (topic || start || end) {
            key = `${req.url}|${start}|${end}|${JSON.stringify(topic)}`;
          }
          break;
        default:
        // don't cache
      }
      return key;
    },
  }
);
cacheMiddleware.attach(app);

/* Here we define the api routes */
app.use(require("./routes"));

/* Here we define the error handling */
app.use(function(err, req, res, next) {
  logger.error(err.stack);
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
      logger.info(
        `Server running on http${
          util.parseBoolean(process.env.HTTPS) ? "s" : ""
        }://${address}:${port}`
      );
    }
  });
});

module.exports = app;
