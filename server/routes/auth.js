const jwt = require("express-jwt");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const publicKey = fs.readFileSync(
  path.join(process.cwd(), process.env.PUBLIC_KEY)
);

const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(" ")[0] === "Token") {
    return authorization.split(" ")[1];
  }

  return null;
};

const auth = {
  required: jwt({
    secret: publicKey,
    userProperty: "user",
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: publicKey,
    userProperty: "user",
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
