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
    } = req.body; /*retorna para o front */
    
    const estab = await Estab.findByPk(estab_id);
    const vaccine = await Vaccine.findByPk(vaccine_id);


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

    if (unity_age != "AO_NASCER" && unity_age != "MESES" && unity_age != "ANOS") {
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
    });
    
    return res.json(campaign);
  }

  async index(req , res) { 

    const campaign = await Campaign.findAll({
      include: [{
        model:Estab,
        as: 'Estab',
      },
      {
        model:Vaccine,
        as: 'vaccine',
      }]
    });    

    return res.json(campaign);
  }

  async show(req, res) {
    const { id } = req.params;

    const vaccine = await Vaccine.findByPk(id, {
      attributes: ['id', 'name'],
    });

    if (!vaccine) return res.status(400).json({ error: 'ID not found' });

    return res.json(vaccine);
  }
}

export default new CampaignController();

