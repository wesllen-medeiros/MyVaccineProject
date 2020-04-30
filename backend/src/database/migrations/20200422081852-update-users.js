'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 
      'tipo_sanguineo', 
      {
        type: Sequelize.STRING(3),
      }
    ); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'tipo_sanguineo');
  }
};
