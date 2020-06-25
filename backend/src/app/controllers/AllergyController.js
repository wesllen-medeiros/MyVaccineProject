import Allergy from "../models/Allergy";
import User from "../models/User";
import UserAllergies from "../models/UserAllergies";

class AllergyController {
  async store(req, res) {
    let AllergyExist = [];

    await Allergy.findOne({
      where: { descricao: req.body.descricao },
    })
      .then(function (result) {
        AllergyExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (AllergyExist) {
      return res.status(400).json({ error: "Alergia já cadastrado!" });
    }

    let allergy = [];

    await Allergy.create(req.body)
      .then(function (result) {
        allergy = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json({
      allergy,
    });
  }

  async index(req, res) {
    let allergy = [];

    await Allergy.findAll()
      .then(function (result) {
        allergy = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(allergy);
  }

  async storeUserAllergy(req, res) {
    const { descricao, ...data } = req.body;

    let AllergyExist = [];

    await Allergy.findOne({
      where: { descricao: descricao },
    })
      .then(function (result) {
        AllergyExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!AllergyExist) {
      return res
        .status(400)
        .json({ error: "Não existe alergia cadastrada com esta descrição!" });
    }

    let UserExist = [];

    await User.findByPk(data.user_id)
      .then(function (result) {
        UserExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!UserExist) {
      return res
        .status(400)
        .json({ error: "Não existe usuário cadastrada com este código!" });
    }

    let UserAllergyExist = [];

    await UserAllergies.findOne({
      where: { allergy_id: AllergyExist.id, user_id: UserExist.id },
    })
      .then(function (result) {
        UserAllergyExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (UserAllergyExist) {
      return res.status(400).json({
        error:
          "Já existe uma alergia cadastrada para este usuário com esta descrição!",
      });
    }

    let retornoUserAllergy = [];

    await UserAllergies.create({
      allergy_id: AllergyExist.id,
      user_id: UserExist.id,
    })
      .then(function (result) {
        retornoUserAllergy = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json({
      retornoUserAllergy,
    });
  }

  async indexUserAllergy(req, res) {
    let userAllergy = [];
    await UserAllergies.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: Allergy,
          as: "allergy",
          attributes: ["descricao"],
        },
      ],
    })
      .then(function (result) {
        userAllergy = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(userAllergy);
  }
}

export default new AllergyController();
