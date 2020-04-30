import Campaign from '../models/Campaign';
import Estab from '../models/Estab';
import Vaccine from '../models/vaccine';

class CampaignController {
  async store(req , res) {

    const {descricao,fx_etaria, dt_ini,dt_fim,state,municipio,estab_id,vaccine_id} = req.body; /*retorna para o front */
    
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
   
    const campaign = await Campaign.create({
      descricao,fx_etaria,dt_ini,dt_fim,state,municipio,estab_id,vaccine_id,
    });
    
    return res.json(campaign);
  }
}

export default new CampaignController();

