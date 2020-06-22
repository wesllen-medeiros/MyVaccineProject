'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('schedules', 
      'estab_id', 
      {
        
        type: Sequelize.INTEGER,
        references: { model: 'estabs', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        defaultValue: 1
      }
    ); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('schedules', 'estab_id');
  }
};
