import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class Estab extends Model {
  static init(sequelize) {
    super.init(
      {
        nm_fantasia: Sequelize.STRING,  
        email: Sequelize.STRING,  
        cnpj: Sequelize.DOUBLE,  
        cidade: Sequelize.STRING,  
        municipio: Sequelize.STRING,  
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave',async estab => {
      if(estab.password){
        estab.password_hash = await bcrypt.hash(estab.password, 8);
      }
    });

    return this;
  }
  
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Estab;