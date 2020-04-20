import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import Estab from '../models/Estab';

class EstabSessionController {
  async store(req,res) {
    const {email, password }  = req.body;

    const estab = await Estab.findOne({where :{ email }}); /*verifica se ja tem o email cadastrado */

    if(!estab){
      return res.status(401).json({
        error: 'Administrador não autorizado!'
      });
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({error: 'Senha não autorizada!'})
    }

    const { id, nm_fantasia} = estab;

    return res.json({
      estab:{
        id,
        nm_fantasia,
        email,
      },
      token: jwt.sign({id},authConfig.secret,{/*autenticação medeiros */
        expiresIn: authConfig.expiresIn,     
      }),
    });
  }
}


export default new EstabSessionController();