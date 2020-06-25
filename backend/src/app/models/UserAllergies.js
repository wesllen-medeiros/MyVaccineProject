import Sequelize, { Model } from "sequelize";

class UserAllergies extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Allergy, {
      foreignKey: "allergy_id",
      as: "allergy",
    });

    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
}
/*campos que o usuário pode preencher ao criar as requisições para a criação do banco */

export default UserAllergies;
