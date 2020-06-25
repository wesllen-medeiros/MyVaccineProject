"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("campaigns", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fx_etaria: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dt_ini: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_fim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      municipio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estab_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "estabs",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      vaccine_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "vaccines",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("campaigns");
  },
};
