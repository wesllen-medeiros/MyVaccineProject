'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('schedules', {
        id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        dose: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        scheduling_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        vaccine_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'vaccines',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
        },
      }); 
  },

  down: queryInterface => {
      return queryInterface.dropTable('schedules');
  }
};