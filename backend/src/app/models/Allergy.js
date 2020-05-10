import Sequelize, { Model } from 'sequelize';

class Allergy extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
      },
      {
        sequelize,
      }
    );    
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'user_allergies',
      as: 'users',
      foreignKey: 'user_id'
    });
  }
  
}

export default Allergy;