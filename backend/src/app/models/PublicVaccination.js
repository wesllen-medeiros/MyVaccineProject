import Sequelize, { Model } from 'sequelize';

class PublicVaccination extends Model {
  static init(sequelize) {
    super.init(
      {
        prevention: Sequelize.STRING,
        audience: Sequelize.STRING,
        min_age: Sequelize.INTEGER,
        max_age: Sequelize.INTEGER,
        unity_age: Sequelize.STRING,
        dose: Sequelize.STRING
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Vaccine, {
      foreignKey: 'vaccine_id',
      as: 'public'
    });
  }

}

export default PublicVaccination;