import Vaccine from '../models/vaccine';

class VaccineController {
  async store(req , res) {
    const VaccineExist = await Vaccine.findOne({ where: {descricao: req.body.descricao}});

    if (VaccineExist) {
      return res.status(400).json({error: 'Vacina já cadastrado!'});
    }

    const { id , descricao, idade } = await Vaccine.create(req.body); /*retorna para o front */

    return res.json({
      id,
      descricao,
      idade,
    });
  }
}

export default new VaccineController();