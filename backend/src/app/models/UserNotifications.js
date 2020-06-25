import Sequelize, { Model } from "sequelize";

class UserNotifications extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.PushNotifications, {
      foreignKey: "push_notification_id",
      as: "notification",
    });

    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}
/*campos que o usuário pode preencher ao criar as requisições para a criação do banco */

export default UserNotifications;
