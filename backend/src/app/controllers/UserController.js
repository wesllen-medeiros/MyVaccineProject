import User from '../models/User';

import fs from 'fs'; //import sistema de arquivos dos modulos do nodejs
import path from 'path';

class UserController {
  async store(req , res) {

    const { name,email,cpf,sexo,dt_nascimento,state,municipio,password} = req.body; /*retorna para o front */

    const userEmailExist = await User.findOne({ where: {email: req.body.email}});

    if (userEmailExist) {
      return res.status(400).json({error: 'Usuário ja cadastrado com este e-mail!'});
    }

    const userCpfExist = await User.findOne({ where: {cpf: req.body.cpf}});

    if (userCpfExist) {
      return res.status(400).json({error: 'Usuário ja cadastrado com este CPF!'});
    }
   
    const user = await User.create({
      name,email,cpf,sexo,dt_nascimento,state,municipio,password
    });
    
    return res.json(user);
  }

  //Criado por Marco Antonio
  //Método de busca dados do usuário
  async index(req, res) {
    
    let pathImage = 'e:/test/';
    
    const user = await User.findOne({ where: {id: req.params.id}});

    if (!user){
      return res.status(400).json({error: 'Usuário não existe' });
    }

    return res.json({id: user.id,
                     name: user.name,
                     email: user.email,
                     cpf: user.cpf,
                     sexo: user.sexo,
                     dt_nascimento: user.dt_nascimento,
                     state: user.state,
                     municipio: user.municipio,
                     photo_profile: new Buffer(fs.readFileSync(path.join(pathImage, user.photo_profile))).toString('base64'),
                     tipo_sanguineo: user.tipo_sanguineo,
                     allergy_id: user.allergy_id,
                     updatedAt: user.updatedAt,
                     createdAt: user.createdAt
                     });
  }
}

export default new UserController();

