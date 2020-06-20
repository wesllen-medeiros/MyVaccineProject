import Estab from '../models/Estab';

class EstabController {
  async store(req , res) {
    const EstabExist = await Estab.findOne({ where: {email: req.body.email}});

    if (EstabExist) {
      return res.status(400).json({error: 'Estabelecimento já cadastrado!'});
    }

    const { id , nm_fantasia, email,cnpj, state, municipio, password  } = await Estab.create(req.body); /*retorna para o front */

    return res.json({
      id , 
      nm_fantasia,
      email,
      cnpj,
      state,
      municipio,
      password,
    });
  }

  async index(req , res) {

    const estab = await Estab.findAll(); /*retorna para o front */

    return res.json(estab);
  }
}

export default new EstabController();