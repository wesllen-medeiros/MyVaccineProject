import Sequelize, { Model } from 'sequelize';

class PushNotifications extends Model {
  static init(sequelize) {
    super.init(
      { 
        message: Sequelize.STRING,  
        title: Sequelize.STRING
      },
      {sequelize}
    );    
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Campaign, {
      foreignKey: 'campaign_id',
      as: 'campaign',
    });

    this.hasMany(models.UserNotifications);
  }
}
/*campos que o usuário pode preencher ao criar as requisições para a criação do banco */

export default PushNotifications;