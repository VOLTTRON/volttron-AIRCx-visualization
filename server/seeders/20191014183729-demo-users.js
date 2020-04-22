"use strict";

const Users = require("../config/users");
const util = require("../utils/util");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      Users.map((user) =>
        Object.assign({}, user, {
          password: util.hashPassword(user.password),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
