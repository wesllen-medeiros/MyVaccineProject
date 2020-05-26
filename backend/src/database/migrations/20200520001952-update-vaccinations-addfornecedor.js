'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vaccines', 
      'fornec', 
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    ); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vaccines', 'fornec');
  }
};
