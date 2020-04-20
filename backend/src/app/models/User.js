import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';


class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.DOUBLE,
        sexo: Sequelize.STRING,
        dt_nascimento: Sequelize.DATE,
        cidade: Sequelize.STRING,
        municipio: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave',async user => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });/*antes da criação executa */

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Allergy, {
      foreignKey: 'allergy_id',
      as: 'users',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
/*campos que o usuário pode preencher ao criar as requisições para a criação do banco */

export default User;