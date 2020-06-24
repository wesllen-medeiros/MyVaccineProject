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
import PushNotificationController from './app/controllers/PushNotificationController';
import DashboardController from './app/controllers/DashboardController';

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
routes.get('/vaccine', VaccineController.index);

/* Estab */
routes.post('/estab', EstabController.store);
routes.get('/estab', EstabController.index);

/* Campaign */
routes.post('/campaign', CampaignController.store);
routes.get('/campaign', CampaignController.index);
routes.delete('/campaign/:id', CampaignController.delete);


/* Application */
routes.post('/application', ApplicationController.store);
routes.get('/application', ApplicationController.indexWeb);
routes.get('/applicationMobile', ApplicationController.indexMobile);

/* Scheduling */
routes.post('/schedule', ScheduleController.store);
routes.get('/schedule', ScheduleController.index);

routes.get('/pushNotifications', PushNotificationController.index);
routes.put('/pushNotifications', PushNotificationController.updateNotification);


routes.get('/appliedVaccines', DashboardController.indexAppliedVaccines);


export default routes;
