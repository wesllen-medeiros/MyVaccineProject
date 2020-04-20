import Sequelize, { Model } from 'sequelize';

class Vaccine extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
        idade: Sequelize.STRING,  
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Vaccine;