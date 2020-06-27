import Application from "../models/Application";
import Vaccine from "../models/vaccine";
import User from "../models/User";
import Estab from "../models/Estab";

class ApplicationController {
  async store(req, res) {
    const {
      nm_agente,
      dt_aplicacao,
      dose,
      reacao,
      vaccine_id,
      estab_id,
      user_id,
    } = req.body;


    const vaccine = await Vaccine.findByPk(vaccine_id);

    if (!vaccine) {
      return res.status(400).json({ error: "Vacina incorreta" });
    }

    const estab = await Estab.findByPk(estab_id);

    if (!estab) {
      return res.status(400).json({ error: "Estabelecimento incorreto" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "Usuário incorreta" });
    }

    const application = await Application.create({
      nm_agente,
      dt_aplicacao,
      dose,
      reacao,
      vaccine_id,
      estab_id,
      user_id,
    });

    return res.json(application);
  }

  async indexMobile(req, res) {
    if (!req.query.userId) {
      return res.status(400).json({ error: "Usuário não informado" });
    }

    const application = await Application.findAll({
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
      order: [["dt_aplicacao", "DESC"]],
    });

    return res.json(application);
  }

  async indexWeb(req, res) {

    const retornoApplication = await Application.findAndCountAll({
      include: [
        {
          model: Estab,
          as: "estab",
        },
        {
          model: Vaccine,
          as: "vaccine",
        },
        {
          model: User,
          as: "user",
        },
      ],
      order: [["dt_aplicacao", "DESC"]],
    });

    return res.json(retornoApplication);
  }
}

export default new ApplicationController();
