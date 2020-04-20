import Allergy from '../models/Allergy';

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
}

export default new AllergyController();