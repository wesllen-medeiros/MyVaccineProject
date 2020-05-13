'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'users',
      'cidade',
      'state'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'users', 
      'state',
      'cidade');
  }
};
