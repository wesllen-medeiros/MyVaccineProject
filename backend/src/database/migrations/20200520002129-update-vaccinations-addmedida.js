'use strict';

module.exports = {
      up: (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.addColumn(
            'vaccines',
            'obs', 
            {
              type: Sequelize.STRING,
              allowNull: false,
            },
          ), 
          queryInterface.addColumn(
            'vaccines',
            'und_medida', 
            {
              type: Sequelize.STRING,
              allowNull: false,
            },
          ), 
        ]); 
      },
    
      down: (queryInterface, Sequelize) => {
        return Promise.all([queryInterface.removeColumn('vaccines', 'obs'),
        queryInterface.removeColumn('vaccines', 'und_medida')
       ]);
      }
};
