import Schedule from "../models/Schedule";
import Vaccine from "../models/vaccine";
import User from "../models/User";
import Estab from "../models/Estab";

class ScheduleController {
  async store(req, res) {
    const { dose, scheduling_date, vaccine_id, user_id, estab_id } = req.body;

    const vaccine = await Vaccine.findByPk(vaccine_id);

    if (!vaccine) {
      return res.status(400).json({ error: "A vacina informada não existe" });
    }
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário inexistente" });
    }

    const scheduleExist = await Schedule.findOne({
      where: {
        user_id: user_id,
        scheduling_date: scheduling_date,
        vaccine_id: vaccine_id,
        dose: dose,
      },
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
      estab_id: estab_id == null ? null : estab_id,
      dose: dose,
    })
      .then(function (result) {
        schedule = true;
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

    const retornoSchedule = await Schedule.findAll({
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
    });

    return res.json(retornoSchedule);
  }
}

export default new ScheduleController();
