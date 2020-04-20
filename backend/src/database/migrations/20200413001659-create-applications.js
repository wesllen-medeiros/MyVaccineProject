'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('applications', { 
        id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nm_agente: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dt_aplicacao: {
          type: Sequelize.DATE,
          allowNull: false,
        }, 
        dose: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        reacao: {
          type: Sequelize.STRING,
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
        vaccine_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'vaccines',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        estab_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'estabs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
      }); 
  },

  down: queryInterface => {
      return queryInterface.dropTable('applications');
  }
};
