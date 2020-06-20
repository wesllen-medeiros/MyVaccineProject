import Sequelize from 'sequelize';

import User from '../app/models/User';
import Allergy from '../app/models/Allergy';
import Vaccine from  '../app/models/vaccine';
import Application from  '../app/models/Application';
import Campaign from  '../app/models/Campaign';
import Estab from  '../app/models/Estab';
import Schedule from '../app/models/Schedule';
import UserAllergies from '../app/models/UserAllergies';
<<<<<<< HEAD

import databaseConfig from '../config/database';

const models = [User,Allergy,Vaccine,Estab,Application,Campaign,Schedule, UserAllergies];
=======
import PublicVaccination from '../app/models/PublicVaccination';

import databaseConfig from '../config/database';

const models = [User,Allergy,Vaccine,Estab,Application,Campaign,Schedule, UserAllergies, PublicVaccination];
>>>>>>> a45c7523cbd63ac04798f73f96a86c794147d682

class Database {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));

    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();