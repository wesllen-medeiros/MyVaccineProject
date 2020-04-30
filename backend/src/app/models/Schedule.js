import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        dose: Sequelize.INTEGER,  
        scheduling_date: Sequelize.DATE
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
      as: 'vaccine',
    });

    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}
export default Schedule;