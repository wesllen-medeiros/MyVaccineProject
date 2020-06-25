import Campaign from "../models/Campaign";
import Estab from "../models/Estab";
import Vaccine from "../models/vaccine";
import PushNotifications from "../models/PushNotifications";
import UserNotifications from "../models/UserNotifications";
import User from "../models/User";

class CampaignController {
  async store(req, res) {

    const {
      descricao,
      dt_ini,
      dt_fim,
      state,
      municipio,
      estab_id,
      vaccine_id,
      audience,
      min_age,
      max_age,
      unity_age,
      dose,
      active,
    } = req.body; 

    let estab = [];
    let vaccine = [];

    await Estab.findByPk(estab_id)
      .then(function (result) {
        estab = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    await Vaccine.findByPk(vaccine_id)
      .then(function (result) {
        vaccine = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!estab) {
      return res.status(400).json({ error: "Estabelecimento incorreto" });
    }

    if (!vaccine) {
      return res.status(400).json({ error: "Vacina incorreta" });
    }

    let campaignExist = [];
    await Campaign.findOne({
      where: {
        dt_ini,
        dt_fim,
        state,
        municipio,
        estab_id,
        vaccine_id,
        audience,
        min_age,
        max_age,
        dose,
      },
    })
      .then(function (result) {
        campaignExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (campaignExist) {
      return res.status(400).json({
        error: "Já existe uma campanha cadastrada com estas definições!",
      });
    }

    if (
      audience != "CRIANCA" &&
      audience != "ADULTO" &&
      audience != "ADOLESCENTE" &&
      audience != "GESTANTE" &&
      audience != "IDOSO"
    ) {
      return res.status(400).json({
        error:
          "Público Alvo deve ser cadastrado para apenas um destes tipos : CRIANCA, ADULTO, ADOLESCENTE, GESTANTE, IDOSO",
      });
    }

    if (
      unity_age != "AO_NASCER" &&
      unity_age != "MESES" &&
      unity_age != "ANOS"
    ) {
      return res.status(400).json({
        error:
          "Únidade da Idade deve ser cadastrado para apenas um destes tipos : AO_NASCER , MESES, ANOS",
      });
    }

    if (min_age == null) {
      return res
        .status(400)
        .json({ error: "Deve ser informado pelo menos 0 na idade mínima" });
    }

    if (max_age == null) {
      return res
        .status(400)
        .json({ error: "Deve ser informado pelo menos 0 na idade máxima" });
    }

    let campaign = [];
    await Campaign.create({
      descricao,
      dt_ini,
      dt_fim,
      state,
      municipio,
      estab_id,
      vaccine_id,
      audience,
      min_age,
      max_age,
      unity_age,
      dose,
      active: active == null ? "ATIVA" : active,
    })
      .then(function (result) {
        campaign = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    let publico =
      campaign.audience == "CRIANCA" && campaign.unity_age == "AO_NASCER"
        ? "recém nascidos"
        : campaign.audience == "CRIANCA" && campaign.unity_age == "MESES"
        ? "bebês"
        : campaign.audience == "CRIANCA" && campaign.unity_age == "ANOS"
        ? "crianças"
        : campaign.audience == "ADOLESCENTE"
        ? "adolescentes"
        : campaign.audience == "ADULTO"
        ? "adultos"
        : campaign.audience == "IDOSO"
        ? "idosos"
        : campaign.audience == "GESTANTE"
        ? "gestantes"
        : null;

    let unidadeIdade =
      campaign.unity_age == "AO_NASCER"
        ? "meses"
        : campaign.unity_age == "MESES"
        ? "meses"
        : campaign.unity_age == "ANOS"
        ? "anos"
        : null;

    let pushNotification = [];
    await PushNotifications.create({
      message:
        campaign.descricao +
        " destinada a " +
        publico +
        " de " +
        campaign.min_age +
        " até " +
        campaign.max_age +
        " " +
        unidadeIdade,
      title: "Campanha de prevenção para " + vaccine.name,
      campaign_id: campaign.id,
    })
      .then(function (result) {
        pushNotification = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    let usersExistentes = [];
    await User.findAll()
      .then(function (result) {
        usersExistentes = result;
      })
      .catch(function (err) {
        console.log(err);
      });


    for (let index = 0; index < usersExistentes.length; index++) {
      const userId = usersExistentes[index].id;

      let userNotification = [];
      await UserNotifications.create({
        user_id: userId,
        push_notification_id: pushNotification.id,
        status: "PENDENTE",
      })
        .then(function (result) {
          userNotification = result;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    return res.json(campaign);
  }

  async index(req, res) {
    let campaign = [];
    await Campaign.findAll({
      include: [
        {
          model: Estab,
          as: "Estab",
        },
        {
          model: Vaccine,
          as: "vaccine",
        },
      ],
    })
      .then(function (result) {
        campaign = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(campaign);
  }

  async delete(req, res) {
    const { id } = req.params;

    let campaign = [];
    await Campaign.findByPk(id)
      .then(function (result) {
        campaign = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!campaign)
      return res.status(400).json({ error: "Campanha não existe" });

    await campaign
      .destroy()
      .then(function () {
        return res.json("Campanha excluída com sucesso");
      })
      .catch(function (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: "Houve um erro ao excluir a campanha" });
      });
  }
}

export default new CampaignController();
