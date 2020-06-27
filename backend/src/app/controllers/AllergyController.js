import Allergy from "../models/Allergy";
import User from "../models/User";
import UserAllergies from "../models/UserAllergies";

class AllergyController {
  async store(req, res) {
    const AllergyExist = await Allergy.findOne({
      where: { descricao: req.body.descricao },
    });

    if (AllergyExist) {
      return res.status(400).json({ error: "Alergia já cadastrado!" });
    }

    const allergy = await Allergy.create(req.body);

    return res.json({
      allergy
    });
  }

  async index(req, res) {

    const allergy = await Allergy.findAll();

    return res.json(allergy);
  }

  async storeUserAllergy(req, res) {
    const { descricao, ...data } = req.body;

    const AllergyExist = await Allergy.findOne({
      where: { descricao: descricao },
    });

    if (!AllergyExist) {
      return res
        .status(400)
        .json({ error: "Não existe alergia cadastrada com esta descrição!" });
    }

    const UserExist =await User.findByPk(data.user_id)

    if (!UserExist) {
      return res
        .status(400)
        .json({ error: "Não existe usuário cadastrada com este código!" });
    }

    const UserAllergyExist =await UserAllergies.findOne({
      where: { allergy_id: AllergyExist.id, user_id: UserExist.id },
    });

    if (UserAllergyExist) {
      return res.status(400).json({
        error:
          "Já existe uma alergia cadastrada para este usuário com esta descrição!",
      });
    }

    const retornoUserAllergy = await UserAllergies.create({
      allergy_id: AllergyExist.id,
      user_id: UserExist.id,
    });

    return res.json({
      retornoUserAllergy
    });
  }

  async indexUserAllergy(req, res) {
    const userAllergy = await UserAllergies.findAll({
      where: { user_id: req.params.userId },
      include: [
        {
          model: Allergy,
          as: "allergy",
          attributes: ["descricao"],
        },
      ],
    });

    return res.json(userAllergy);
  }
}

export default new AllergyController();
