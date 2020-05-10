import { Router } from 'express';

import UserController from './app/controllers/UserController';
import UserSessionController from './app/controllers/UserSessionController';
import AdminSessionController from './app/controllers/AdminSessionController';
import AllergyController from './app/controllers/AllergyController';
import VaccineController from './app/controllers/VaccineController';
import EstabController from './app/controllers/EstabController';
import CampaignController from './app/controllers/CampaignController';
import ApplicationController from './app/controllers/ApplicationController';
import ScheduleController from './app/controllers/ScheduleController';

const routes = new Router();

/* User */
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.index);
routes.put('/users', UserController.updateUser);

/* UserSession */
routes.post('/Usersessions', UserSessionController.store);

/*AdminSession */
routes.post('/Adminsessions', AdminSessionController.store);

/* Allergy */
routes.post('/allergy', AllergyController.store);
routes.post('/userAllergy', AllergyController.storeUserAllergy);
routes.get('/allergy', AllergyController.index);
routes.get('/userAllergy/:userId', AllergyController.indexUserAllergy);
/* Vaccine */
routes.post('/vaccine', VaccineController.store);

/* Estab */
routes.post('/estab', EstabController.store);

/* Campaign */
routes.post('/campaign', CampaignController.store);

/* Application */
routes.post('/application', ApplicationController.store);

/* Scheduling */
routes.post('/schedule', ScheduleController.store);


export default routes;
