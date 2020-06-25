"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "allergy_id");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "allergy_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "allergies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
