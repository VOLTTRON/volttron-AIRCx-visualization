"use strict";

const Organizations = require("../config/organizations");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Organizations",
      Organizations.map(org =>
        Object.assign({}, org, { createdAt: new Date(), updatedAt: new Date() })
      ),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Organizations", null, {});
  }
};
