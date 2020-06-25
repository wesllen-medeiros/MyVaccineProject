import Schedule from "../models/Schedule";
import Vaccine from "../models/vaccine";
import User from "../models/User";
import Estab from "../models/Estab";

class ScheduleController {
  async store(req, res) {
    const { dose, scheduling_date, vaccine_id, user_id, estab_id } = req.body;

    let vaccine = [];

    await Vaccine.findByPk(vaccine_id)
      .then(function (result) {
        vaccine = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!vaccine) {
      return res.status(400).json({ error: "A vacina informada não existe" });
    }
    let user = [];
    await User.findByPk(user_id)
      .then(function (result) {
        user = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!user) {
      return res.status(400).json({ error: "Usuário inexistente" });
    }

    let scheduleExist = [];

    await Schedule.findOne({
      where: {
        user_id: user_id,
        scheduling_date: scheduling_date,
        vaccine_id: vaccine_id,
        dose: dose,
      },
    })
      .then(function (result) {
        scheduleExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (scheduleExist) {
      return res.status(400).json({
        error:
          "Já existe um agentamento cadastrado para este usuário na data informada, com esta vacina e dose",
      });
    }

    let schedule = [];
    await Schedule.create({
      user_id: user_id,
      scheduling_date: scheduling_date,
      vaccine_id: vaccine_id,
      dose: dose,
      estab_id: estab_id == null ? null : estab_id,
    })
      .then(function (result) {
        schedule = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(schedule);
  }

  async index(req, res) {
    if (!req.query.userId) {
      return res.status(400).json({ error: "Usuário não informado" });
    }

    let retornoSchedule = [];

    await Schedule.findAll({
      where: { user_id: req.query.userId },
      include: [
        {
          model: Vaccine,
          as: "vaccine",
        },
        {
          model: User,
          as: "user",
        },
        {
          model: Estab,
          as: "estab",
        },
      ],
      order: [["scheduling_date", "DESC"]],
    })
      .then(function (result) {
        retornoSchedule = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(retornoSchedule);
  }
}

export default new ScheduleController();
