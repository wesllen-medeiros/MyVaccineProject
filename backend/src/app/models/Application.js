import Sequelize, { Model } from 'sequelize';

class Application extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_agente: Sequelize.STRING,  
        dt_aplicacao: Sequelize.DATE,
        dose: Sequelize.STRING,
        reacao: Sequelize.STRING,
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
      as: 'estab',
    });

    this.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'vaccine',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
export default Application;