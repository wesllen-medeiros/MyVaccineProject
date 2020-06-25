import Estab from "../models/Estab";

class EstabController {
  async store(req, res) {
    let EstabExist = [];
    await Estab.findOne({
      where: { email: req.body.email },
    })
      .then(function (result) {
        EstabExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (EstabExist) {
      return res.status(400).json({ error: "Estabelecimento já cadastrado!" });
    }

    let estab = [];

    await Estab.create(req.body)
      .then(function (result) {
        estab = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(estab);
  }

  async index(req, res) {
    let retornoEstab = [];

    await Estab.findAll()
      .then(function (result) {
        retornoEstab = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(retornoEstab);
  }
}

export default new EstabController();
