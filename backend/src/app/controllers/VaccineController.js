import Vaccine from '../models/vaccine';

class VaccineController {
  async store(req, res) {
    const VaccineExist = await Vaccine.findOne({ where: { descricao: req.body.descricao } });

    if (VaccineExist) {
      return res.status(400).json({ error: 'Vacina já cadastrado!' });
    }

    const { id, descricao, fornec, obs, und_medida } = await Vaccine.create(req.body); /*retorna para o front */

    return res.json({
      id,
      descricao,
      fornec,
      obs,
      und_medida
    });
  }

  async index({ res }) {
    const vaccine = await Vaccine.findAll();

    return res.json(vaccine)
  }
}

export default new VaccineController();