import Sequelize, { Model } from "sequelize";

import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        sexo: Sequelize.STRING,
        dt_nascimento: Sequelize.DATE,
        state: Sequelize.STRING,
        municipio: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        photo_profile: Sequelize.STRING,
        tipo_sanguineo: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); /*antes da criação executa */

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Allergy, {
      through: "user_allergies",
      as: "allergies",
      foreignKey: "allergy_id",
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
/*campos que o usuário pode preencher ao criar as requisições para a criação do banco */

export default User;
