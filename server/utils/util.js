const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

/**
 * Securely hash the supplied password.
 *
 * @param {String} password
 */
const hashPassword = (password) => {
  const salt = fs.readFileSync(
    path.join(process.cwd(), process.env.PASSWORD_SALT)
  );
  if (!salt) {
    logger.warn("PASSWORD_SALT should point to a valid salt file.");
  }
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");
};

/**
 * Parse a string and return a boolean value.
 *
 * @param {String} value
 */
const parseBoolean = (value) => /^\s*true|yes|t|y\s*$/i.test(value);

module.exports.hashPassword = hashPassword;
module.exports.parseBoolean = parseBoolean;
