import Estab from "../models/Estab";

class EstabController {
  async store(req, res) {
    const EstabExist = await Estab.findOne({
      where: { email: req.body.email },
    });

    if (EstabExist) {
      return res.status(400).json({ error: "Estabelecimento já cadastrado!" });
    }

    const estab = await Estab.create(req.body);

    return res.json(estab);
  }

  async index(req, res) {
    const retornoEstab = await Estab.findAll();

    return res.json(retornoEstab);
  }
}

export default new EstabController();
