'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'estabs',
      'cnpj',
      {
        type: Sequelize.STRING(14),
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'estabs',
      'cnpj',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  }
};
