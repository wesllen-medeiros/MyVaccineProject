'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'schedules',
      'dose',
      {
        type: Sequelize.STRING(15),
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'schedules',
      'dose',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  }
};