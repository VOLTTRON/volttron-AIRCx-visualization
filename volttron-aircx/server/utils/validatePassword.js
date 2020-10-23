/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const util = require("./util");

/**
 * Validates that the provided password matches the hashed counterpart
 *
 * @since 1.0.0
 * @category validation
 * @param {String} password The password provided by the user
 * @param {String} hashedPassword The password stored in your db
 * @returns {Boolean} the
 */
const validatePassword = (password, hashedPassword) => {
  return hashedPassword === util.hashPassword(password);
};

module.exports = validatePassword;
