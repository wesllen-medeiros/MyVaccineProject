import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req,res) {
    console.log(req.body);
    const {email, password }  = req.body;

    const user = await User.findOne({where :{ email }}); /*verifica se ja tem o email cadastrado */

    if(!user){
      return res.status(401).json({
        error: 'Usuário inexistente!'
      });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: 'Senha incorreta!'})
    }

    const { id, name} = user;

    return res.json({
      user:{
        id,
        name,
        email,
      },
      token: jwt.sign({id},authConfig.secret,{/*autenticação medeiros */
        expiresIn: authConfig.expiresIn,     
      }),
    });
  }
}


export default new SessionController();