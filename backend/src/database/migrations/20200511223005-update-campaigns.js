'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'campaigns',
        'audience',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "CRIANCA"
        }
      ),
      queryInterface.addColumn(
        'campaigns',
        'min_age',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }
      ),
      queryInterface.addColumn(
        'campaigns',
        'max_age',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
        }
      ),
      queryInterface.addColumn(
        'campaigns',
        'unity_age',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "MESES"
        }
      ),
      queryInterface.addColumn(
        'campaigns',
        'dose',
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: "teste"
        }
      ),
      queryInterface.removeColumn('campaigns', 'fx_etaria')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([ queryInterface.addColumn('campaigns', 
      'fx_etaria', 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
    ),
    queryInterface.removeColumn('campaigns', 'audience'),
    queryInterface.removeColumn('campaigns', 'min_age'),
    queryInterface.removeColumn('campaigns', 'max_age'),
    queryInterface.removeColumn('campaigns', 'unity_age'),
    queryInterface.removeColumn('campaigns', 'dose'),
    ]);
  }
};
