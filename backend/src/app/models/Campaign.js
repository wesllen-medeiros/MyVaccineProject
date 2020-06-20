import Sequelize, { Model } from 'sequelize';

class Campaign extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
        dt_ini: Sequelize.DATE,  
        dt_fim: Sequelize.DATE,  
        state: Sequelize.STRING,  
        municipio: Sequelize.STRING,
        audience: Sequelize.STRING,
        min_age: Sequelize.INTEGER,
        max_age: Sequelize.INTEGER,
        unity_age: Sequelize.STRING,
        dose: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Estab, {
      foreignKey: 'estab_id',
      as: 'Estab'
    });
    
    this.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'vaccine',
    });
  }

}

export default Campaign;