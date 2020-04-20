import User from '../models/User';
import Allergy from '../models/Allergy';

class UserController {
  async store(req , res) {

    const { name,email,cpf,sexo,dt_nascimento,cidade,municipio,password,allergy_id} = req.body; /*retorna para o front */
    
    const allergy = await Allergy.findByPk(allergy_id);

    if (!allergy) {
      return res.status(400).json({error: 'alergia incorreta'});
    }

    const userExist = await User.findOne({ where: {email: req.body.email}});

    if (userExist) {
      return res.status(400).json({error: 'Usuário ja cadastrado!'});
    }
   
    const user = await User.create({
      name,email,cpf,sexo,dt_nascimento,cidade,municipio,password,allergy_id,
    });
    
    return res.json(user);
  }
}

export default new UserController();

