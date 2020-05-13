'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('public_vaccines', { 
        id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        prevention: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        audience: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        min_age: {
          type:Sequelize.INTEGER,
          allowNull: false,
        },
        max_age: {
          type:Sequelize.INTEGER,
          allowNull: false,
        },
        unity_age: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        dose: {
          type:Sequelize.STRING,
          allowNull: false,
        },
        vaccine_id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'allergies',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
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
      return queryInterface.dropTable('public_vaccines');
  }
};
