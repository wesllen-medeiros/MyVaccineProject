import PushNotifications from "../models/PushNotifications";
import UserNotifications from "../models/UserNotifications";
import User from "../models/User";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

class PushNotification {
  async updateNotification(req, res) {
    let user = [];
    await User.findOne({ where: { id: req.body.userId } })
      .then(function (result) {
        user = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    let userNotification = [];
    await UserNotifications.findOne({
      where: {
        push_notification_id: req.body.userNotificationId,
        user_id: req.body.userId,
      },
    })
      .then(function (result) {
        userNotification = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!userNotification) {
      return res
        .status(400)
        .json({ error: "Não existe notificação pendente para este usuário" });
    }

    let userNotificationsUp = [];

    await UserNotifications.update(
      {
        status: "ENVIADA",
      },
      {
        returning: true,
        where: {
          push_notification_id: req.body.userNotificationId,
          user_id: req.body.userId,
        },
      }
    )
      .then(function (result) {
        userNotificationsUp = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(userNotificationsUp);
  }

  async index(req, res) {

    const user = await User.findOne({ where: { id: req.query.userId } });

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    let pushNotifications = [];

    if (req.query.orderBy !== "DESC") {
      await PushNotifications.findAll({
        include: [
          {
            model: UserNotifications,
            as: "UserNotifications",
            where: {
              user_id: user.id,
              status:
                req.query.status !== undefined
                  ? req.query.status
                  : {
                      [Op.ne]: null,
                    },
            },
          },
        ],
      })
        .then(function (result) {
          pushNotifications = result;
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      await PushNotifications.findAll({
        include: [
          {
            model: UserNotifications,
            as: "UserNotifications",
            where: {
              user_id: user.id,
              status:
                req.query.status !== undefined
                  ? req.query.status
                  : {
                      [Op.ne]: null,
                    },
            },
          },
        ],
        order: [["id", "DESC"]],
      })
        .then(function (result) {
          pushNotifications = result;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    return res.json(pushNotifications);
  }
}

export default new PushNotification();
