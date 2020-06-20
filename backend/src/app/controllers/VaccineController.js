import Vaccine from '../models/vaccine';
import PublicVaccination from '../models/PublicVaccination';

class VaccineController {
<<<<<<< HEAD
  async store(req, res) {
    const VaccineExist = await Vaccine.findOne({ where: { descricao: req.body.descricao } });

    if (VaccineExist) {
      return res.status(400).json({ error: 'Vacina já cadastrado!' });
    }

    const { id, descricao, fornec, obs, und_medida } = await Vaccine.create(req.body); /*retorna para o front */

    return res.json({
      id,
      descricao,
      fornec,
      obs,
      und_medida
    });
=======
  async store(req , res) {

    let vaccine = null;

    let erro_mensagem_publico = "";

    let erro_mensagem_vacina = ""

    let count_erros = 0;

    const { descricao, ...data } = req.body;

    const VaccineExist = await Vaccine.findOne({ where: {descricao}});

    if (!VaccineExist) {
      vaccine = await Vaccine.create({descricao: req.body.descricao}); /*retorna para o front */
    } else {
      erro_mensagem_vacina = "Esta Vacina não foi cadastrada, pois já existe outra cadastrada com esta descrição";
    }

    for (let index = 0; index < data.public.length; index++) {

      let PublicVaccinationExist = await PublicVaccination.findOne({
          where: {
                  prevention: data.public[index].prevention,
                  audience: data.public[index].audience,
                  min_age: data.public[index].min_age,
                  max_age: data.public[index].max_age,
                  unity_age: data.public[index].unity_age,
                  dose: data.public[index].dose,
                  vaccine_id: VaccineExist ? VaccineExist.id : vaccine.id 
                }
        }
      )

      if(PublicVaccinationExist){
        count_erros++;
        erro_mensagem_publico += "Já existe um público " + data.public[index].audience + " cadastrado com estas informações para esta vacina! "
      }else {
        await PublicVaccination.create({
          prevention: data.public[index].prevention,
          audience: data.public[index].audience,
          min_age: data.public[index].min_age,
          max_age: data.public[index].max_age,
          unity_age: data.public[index].unity_age,
          dose: data.public[index].dose,
          vaccine_id: VaccineExist ? VaccineExist.id : vaccine.id
        }); 
      }           
    }

    if ((erro_mensagem_publico != "" && count_erros == data.public.length ) && erro_mensagem_vacina != ""){
      return res.json({
        erro_mensagem_vacina,
        erro_mensagem_publico
      });
    } else {
      
      vaccine = await Vaccine.findAll({where: {id: VaccineExist ? VaccineExist.id : vaccine.id },
        include: [{
          model: PublicVaccination,
          as: 'public'
        }]
      })

      return res.json(vaccine);
    }

    
  }

  async index(req , res) {

    const vaccine = await Vaccine.findAll({
                                  include: [{
                                    model: PublicVaccination,
                                    as: 'public'
                                  }]
                                })

    return res.json(vaccine);
>>>>>>> a45c7523cbd63ac04798f73f96a86c794147d682
  }

  async index({ res }) {
    const vaccine = await Vaccine.findAll();

    return res.json(vaccine)
  }
}

export default new VaccineController();