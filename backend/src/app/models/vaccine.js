import Sequelize, { Model } from 'sequelize';

class Vaccine extends Model {
  static init(sequelize) {
    super.init(
      {
<<<<<<< HEAD
        descricao: Sequelize.STRING,  
        fornec: Sequelize.STRING,
        obs: Sequelize.STRING,
        und_medida: Sequelize.STRING,  
=======
        descricao: Sequelize.STRING
>>>>>>> a45c7523cbd63ac04798f73f96a86c794147d682
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.PublicVaccination, {
      foreignKey: 'vaccine_id',
      as: 'public'
    });
  }
}

export default Vaccine;