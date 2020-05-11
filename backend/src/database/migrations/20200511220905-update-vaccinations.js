'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vaccines', 'idade')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('vaccines', 
      'idade', 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    ) 
  }
};
