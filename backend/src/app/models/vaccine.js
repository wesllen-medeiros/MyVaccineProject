import Sequelize, { Model } from 'sequelize';

class Vaccine extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
        idade: Sequelize.STRING,
        dose_number: Sequelize.INTEGER  
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Vaccine;