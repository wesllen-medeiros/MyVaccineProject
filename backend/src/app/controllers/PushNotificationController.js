import PushNotifications from '../models/PushNotifications';
import UserNotifications from '../models/UserNotifications';
import User from '../models/User';
import Sequelize from 'sequelize';
const Op = Sequelize.Op

class PushNotification {

  async updateNotification(req , res) { 

    console.log('Params Update Id: ' + JSON.stringify(req.body));

    const user = await User.findOne({ where: {id: req.body.userId}});

    if (!user){
      return res.status(400).json({error: 'Usuário não existe' });
    }

    const userNotification = await UserNotifications.findOne({ where: {push_notification_id: req.body.userNotificationId,
                                                                       user_id: req.body.userId}});

    if (!userNotification){
      return res.status(400).json({error: 'Não existe notificação pendente para este usuário' });
    }

    const userNotificationsUp = await UserNotifications.update(
      {
        status: 'ENVIADA'
      }, {returning: true, where: {push_notification_id: req.body.userNotificationId,
                                  user_id: req.body.userId} });    

    return res.json(userNotificationsUp);
  }

  async index(req , res) { 

    console.log('Params Id: ' + JSON.stringify(req.query));

    const user = await User.findOne({ where: {id: req.query.userId}});

    if (!user){
      return res.status(400).json({error: 'Usuário não existe' });
    }

    const pushNotifications = await PushNotifications.findAll({
      include:[
        {
          model: UserNotifications,
          as: 'UserNotifications',
          where: { user_id: user.id,
                   status: req.query.status !== undefined ? req.query.status : {
                    [Op.ne]: null
                }}
        }
      ]
    });    

    return res.json(pushNotifications);
  }
}

export default new PushNotification();

