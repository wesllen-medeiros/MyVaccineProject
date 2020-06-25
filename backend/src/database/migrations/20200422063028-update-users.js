"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("users", "cpf", {
      type: Sequelize.STRING(11),
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("users", "cpf", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
