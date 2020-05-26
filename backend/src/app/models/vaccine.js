import Sequelize, { Model } from 'sequelize';

class Vaccine extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,  
        fornec: Sequelize.STRING,
        obs: Sequelize.STRING,
        und_medida: Sequelize.STRING,  
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Vaccine;