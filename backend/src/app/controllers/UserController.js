import User from '../models/User';

import fs from 'fs'; //import sistema de arquivos dos modulos do nodejs
import path from 'path';

class UserController {
  async store(req , res) {

																											 

    const { 
      name, 
      email, 
      cpf, 
      sexo, 
      dt_nascimento, 
      state, 
      municipio, 
      password, 
      tipo_sanguineo } = req.body; /*retorna para o front */

    const userEmailExist = await User.findOne({ where: {email: req.body.email}});

    if (userEmailExist) {
      return res.status(400).json({error: 'Usuário ja cadastrado com este e-mail!'});
    }

    const userCpfExist = await User.findOne({ where: {cpf: req.body.cpf}});

    if (userCpfExist) {
      return res.status(400).json({error: 'Usuário ja cadastrado com este CPF!'});
    }
   
    const user = await User.create({
      name, 
      email, 
      cpf, 
      sexo, 
      dt_nascimento, 
      state, 
      municipio, 
      password, 
      tipo_sanguineo
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
                     photo_profile: user.photo_profile ? new Buffer(fs.readFileSync(path.join(pathImage, user.photo_profile))).toString('base64') : null,
                     tipo_sanguineo: user.tipo_sanguineo,
                     password_hash: user.password_hash,
                     allergy_id: user.allergy_id,
                     updatedAt: user.updatedAt,
                     createdAt: user.createdAt
                     });
  }

  async updateUser(req , res) {

    const { id, name, email, cpf, sexo, dt_nascimento, state, municipio, password_hash, photo_profile, tipo_sanguineo} = req.body; /*retorna para o front */

    const userExist = await User.findByPk(id);

    if (!userExist) {
      return res.status(400).json({error: 'Não existe usuário cadastrado com esse código'});    
    }

    let photoUpdate = cpf+id+'.png';  
    
    let pathImage = path.join('e:/test/',photoUpdate);

    let base64Image = photo_profile ? photo_profile.split(';base64,').pop() : null;

    base64Image ?
    fs.writeFile(pathImage, base64Image, {encoding: 'base64'}, function(err) {
      console.log('File created');
    }) 
    : null;

    const user = await User.update({name, email, cpf, sexo, dt_nascimento, state, municipio, password_hash, photo_profile: base64Image ? photoUpdate : null, tipo_sanguineo
    }, {returning: true, where: {id: id} });
    
    return res.json(user);
  }

}

export default new UserController();

