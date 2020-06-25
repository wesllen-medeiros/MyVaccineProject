import User from "../models/User";

import fs from "fs"; //import sistema de arquivos dos modulos do nodejs
import path from "path";

class UserController {
  async store(req, res) {
    const {
      name,
      email,
      cpf,
      sexo,
      dt_nascimento,
      state,
      municipio,
      password,
      tipo_sanguineo,
    } = req.body;

    let userEmailExist = [];

    await User.findOne({
      where: { email: req.body.email },
    })
      .then(function (result) {
        userEmailExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (userEmailExist) {
      return res
        .status(400)
        .json({ error: "Usuário ja cadastrado com este e-mail!" });
    }

    let userCpfExist = [];

    await User.findOne({ where: { cpf: req.body.cpf } })
      .then(function (result) {
        userCpfExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (userCpfExist) {
      return res
        .status(400)
        .json({ error: "Usuário ja cadastrado com este CPF!" });
    }

    let retornoUser = [];
    await User.create({
      name,
      email,
      cpf,
      sexo,
      dt_nascimento,
      state,
      municipio,
      password,
      tipo_sanguineo,
    })
      .then(function (result) {
        retornoUser = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(retornoUser);
  }

  //Criado por Marco Antonio
  //Método de busca dados do usuário
  async index(req, res) {
    let pathImage = "e:/test/";

    let user = [];
    await User.findOne({ where: { id: req.params.id } })
      .then(function (result) {
        user = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!user) {
      return res.status(400).json({ error: "Usuário não existe" });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      sexo: user.sexo,
      dt_nascimento: user.dt_nascimento,
      state: user.state,
      municipio: user.municipio,
      photo_profile: user.photo_profile
        ? new Buffer(
            fs.readFileSync(path.join(pathImage, user.photo_profile))
          ).toString("base64")
        : null,
      tipo_sanguineo: user.tipo_sanguineo,
      password_hash: user.password_hash,
      allergy_id: user.allergy_id,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    });
  }

  async updateUser(req, res) {
    const {
      id,
      name,
      email,
      cpf,
      sexo,
      dt_nascimento,
      state,
      municipio,
      password_hash,
      photo_profile,
      tipo_sanguineo,
    } = req.body;

    let userExist = [];
    await User.findByPk(id)
      .then(function (result) {
        userExist = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    if (!userExist) {
      return res
        .status(400)
        .json({ error: "Não existe usuário cadastrado com esse código" });
    }

    let photoUpdate = cpf + id + ".png";

    let pathImage = path.join("e:/test/", photoUpdate);

    let base64Image = photo_profile
      ? photo_profile.split(";base64,").pop()
      : null;

    base64Image
      ? fs.writeFile(pathImage, base64Image, { encoding: "base64" }, function (
          err
        ) {
          console.log("File created");
        })
      : null;

    let retornoUpdateUser = [];

    await User.update(
      {
        name,
        email,
        cpf,
        sexo,
        dt_nascimento,
        state,
        municipio,
        password_hash,
        photo_profile: base64Image ? photoUpdate : null,
        tipo_sanguineo,
      },
      { returning: true, where: { id: id } }
    )
      .then(function (result) {
        retornoUpdateUser = result;
      })
      .catch(function (err) {
        console.log(err);
      });

    return res.json(retornoUpdateUser);
  }
}

export default new UserController();
