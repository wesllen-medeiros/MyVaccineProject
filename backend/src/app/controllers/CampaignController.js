import Campaign from '../models/Campaign';
import Estab from '../models/Estab';
import Vaccine from '../models/vaccine';

class CampaignController {
  async store(req , res) {

    const {
      descricao, 
      dt_ini, 
      dt_fim, 
      state, 
      municipio, 
      estab_id, 
      vaccine_id, 
      audience, 
      min_age, 
      max_age, 
      unity_age, 
      dose, 
      active} = req.body; /*retorna para o front */
    
    const estab = await Estab.findByPk(estab_id);
    const vaccine = await Vaccine.findByPk(vaccine_id);

    if (active == null){
      active = "ATIVA";
    }

    if (!estab) {
      return res.status(400).json({error: 'Estabelecimento incorreto'});
    }

    if (!vaccine) {
      return res.status(400).json({error: 'Vacina incorreta'});
    }

    const campaignExist = await Campaign.findOne({ where: {descricao: req.body.descricao}});

    if (campaignExist) {
      return res.status(400).json({error: 'Campanha ja cadastrado!'});
    }

    if (audience != "CRIANCA" && audience != "ADULTO" && audience != "ADOLESCENTE" && audience != "GESTANTE") {
      return res.status(400).json({error: 'Público Alvo deve ser cadastrado para apenas um destes tipos : CRIANCA, ADULTO, ADOLESCENTE, GESTANTE'});
    }

    if (unity_age != "CRIANCA" && unity_age != "ADULTO" && unity_age != "ADOLESCENTE") {
      return res.status(400).json({error: 'Únidade da Idade deve ser cadastrado para apenas um destes tipos : AO_NASCER , MESES, ANOS'});
    }

    if (min_age == null){
      return res.status(400).json({error: 'Deve ser informado pelo menos 0 na idade mínima'});
    }

    if (max_age == null){
      return res.status(400).json({error: 'Deve ser informado pelo menos 0 na idade máxima'});
    }
   
    const campaign = await Campaign.create({
      descricao,
      dt_ini,
      dt_fim,
      state,
      municipio,
      estab_id,
      vaccine_id, 
      audience, 
      min_age, 
      max_age, 
      unity_age, 
      dose,
      active
    });
    
    return res.json(campaign);
  }

  async index(req , res) { 

    const campaign = await Campaign.findAll();    

    return res.json(campaign);
  }
}

export default new CampaignController();

