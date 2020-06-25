"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("vaccines", "dose_number");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("vaccines", "dose_number", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    });
  },
};
