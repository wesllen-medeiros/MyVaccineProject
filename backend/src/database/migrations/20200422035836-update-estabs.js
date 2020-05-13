'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'estabs',
      'cidade',
      'state'
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'estabs', 
      'state',
      'cidade');
  }
};
