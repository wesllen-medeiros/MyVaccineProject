import Sequelize, { Model } from 'sequelize';

class Campaign extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
        fx_etaria: Sequelize.INTEGER,  
        dt_ini: Sequelize.DATE,  
        dt_fim: Sequelize.DATE,  
        cidade: Sequelize.STRING,  
        municipio: Sequelize.STRING,  
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
      as: 'vaccine'
    });
  }

}

export default Campaign;