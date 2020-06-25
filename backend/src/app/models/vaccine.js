import Sequelize, { Model } from "sequelize";

class Vaccine extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        prevention: Sequelize.STRING,
        dose: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.PublicVaccination, {
      foreignKey: "vaccine_id",
      as: "public",
    });
  }
}

export default Vaccine;
