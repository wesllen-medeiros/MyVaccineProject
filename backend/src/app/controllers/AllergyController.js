import Allergy from '../models/Allergy';
import User from '../models/User';
import UserAllergies from '../models/UserAllergies';

class AllergyController {
  async store(req , res) {
    const AllergyExist = await Allergy.findOne({ where: {descricao: req.body.descricao}});

    if (AllergyExist) {
      return res.status(400).json({error: 'Alergia já cadastrado!'});
    }

    const { id , descricao} = await Allergy.create(req.body); /*retorna para o front */

    return res.json({
      id,
      descricao,
    });
  }

  async index(req , res) {

    const allergy = await Allergy.findAll();

    return res.json(allergy);
  }

  async storeUserAllergy(req , res) {

    const { descricao, ...data } = req.body 

    const AllergyExist = await Allergy.findOne({ where: {descricao: descricao}});

    if (!AllergyExist) {
      return res.status(400).json({error: 'Não existe alergia cadastrada com esta descrição!'});
    }

    const UserExist = await User.findByPk(data.user_id);

    if (!UserExist) {
      return res.status(400).json({error: 'Não existe usuário cadastrada com este código!'});
    }

    const UserAllergyExist = await UserAllergies.findOne({where: {allergy_id: AllergyExist.id, user_id: UserExist.id}})

    if (UserAllergyExist) {
      return res.status(400).json({error: 'Já existe uma alergia cadastrada para este usuário com esta descrição!'});
    }

														  

    const { allergy_id, user_id} = await UserAllergies.create({allergy_id: AllergyExist.id, user_id: UserExist.id}); /*retorna para o front */

    return res.json({
      allergy_id, 
      user_id
    });
  }

  async indexUserAllergy(req , res) {

    const userAllergy = await UserAllergies.findAll({ where: {user_id: req.params.userId}, 
      include:[
        {
          model: Allergy,
          as: 'allergy',
          attributes: ["descricao"]
        }
      ]
    });

    return res.json(userAllergy)
  }
}

export default new AllergyController();