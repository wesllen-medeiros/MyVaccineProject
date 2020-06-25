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

    let vaccine = [];

    await Vaccine.findByPk(vaccine_id)
      .then(function (result) {
        vaccine = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!vaccine) {
      return res.status(400).json({ error: "Vacina incorreta" });
    }

    let estab = [];

    await Estab.findByPk(estab_id)
      .then(function (result) {
        estab = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!estab) {
      return res.status(400).json({ error: "Estabelecimento incorreto" });
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
      return res.status(400).json({ error: "Usuário incorreta" });
    }

    let application = [];
    await Application.create({
      nm_agente,
      dt_aplicacao,
      dose,
      reacao,
      vaccine_id,
      estab_id,
      user_id,
    })
      .then(function (result) {
        application = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(application);
  }

  async indexMobile(req, res) {
    if (!req.query.userId) {
      return res.status(400).json({ error: "Usuário não informado" });
    }

    let application = [];

    await Application.findAll({
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
    })
      .then(function (result) {
        application = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(application);
  }

  async indexWeb(req, res) {
    let retornoApplication = [];

    await Application.findAndCountAll({
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
    })
      .then(function (result) {
        retornoApplication = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(retornoApplication);
  }
}

export default new ApplicationController();
