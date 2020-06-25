"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("campaigns", "cidade", "state");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("campaigns", "state", "cidade");
  },
};
