'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 
      'photo_profile', 
      {
        type: Sequelize.STRING,
      }
    ); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'photo_profile');
  }
};
