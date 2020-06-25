import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

import Estab from "../models/Estab";

class EstabSessionController {
  async store(req, res) {
    const { email, password } = req.body;

    let estab = [];

    await Estab.findOne({
      where: { email },
    })
      .then(function (result) {
        estab = result;
      })
      .catch(function (err) {
        console.log(err);
      }); /*verifica se ja tem o email cadastrado */

    if (!estab) {
      return res.status(401).json({
        error: "Administrador não autorizado!",
      });
    }

    if (!(await estab.checkPassword(password))) {
      return res.status(401).json({ error: "Senha não autorizada!" });
    }

    const { id, nm_fantasia } = estab;

    return res.json({
      estab: {
        id,
        nm_fantasia,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        /*autenticação medeiros */ expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new EstabSessionController();
