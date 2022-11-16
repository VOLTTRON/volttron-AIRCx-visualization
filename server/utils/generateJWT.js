/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv-flow").config({
  silent: true,
});

const privateKey = fs.readFileSync(
  path.join(process.cwd(), process.env.PRIVATE_KEY)
);

/**
 * generate the json web token that we'll use for authentication
 *
 * @since 1.0.0
 * @category authentication
 * @param    {Any} id The user ID
 * @param    {String} email The email of the user
 * @param    {String} name The name of the user
 * @param    {String} surname The surname of the user
 * @param    {String} scope The user scope (permissions)
 * @returns  {Object} The generated JWT
 */

const generateJWT = ({ id, email, name, surname, scope }) => {
  const today = new Date();
  const expirationDate = new Date(today);

  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      id,
      email,
      name,
      surname,
      scope,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    privateKey,
    { algorithm: "RS256" }
  );
};

module.exports = generateJWT;
