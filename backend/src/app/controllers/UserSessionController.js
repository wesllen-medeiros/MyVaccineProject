import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req,res) {
    const {email, password }  = req.body;

    const user = await User.findOne({where :{ email }}); /*verifica se ja tem o email cadastrado */

    if(!user){
      return res.status(401).json({
        error: 'Usuário não autorizado!'
      });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: 'Senha não autorizada!'})
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