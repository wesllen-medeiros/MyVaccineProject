import Campaign from '../models/Campaign';
import Estab from '../models/Estab';
import Vaccine from '../models/vaccine';
import PushNotifications from '../models/PushNotifications';
import UserNotifications from '../models/UserNotifications';
import User from '../models/User';

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
      active 
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
      return res.status(400).json({error: 'Campanha ja cadastrada!'});
    }

    if (audience != "CRIANCA" && audience != "ADULTO" && audience != "ADOLESCENTE" && audience != "GESTANTE" && audience != "IDOSO") {
      return res.status(400).json({error: 'Público Alvo deve ser cadastrado para apenas um destes tipos : CRIANCA, ADULTO, ADOLESCENTE, GESTANTE, IDOSO'});
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
      active: active == null ? 'ATIVA' : active
    });

    let publico = campaign.audience == 'CRIANCA' && campaign.unity_age == 'AO_NASCER' ? 'recém nascidos' :  
                  campaign.audience == 'CRIANCA' && campaign.unity_age == 'MESES' ? 'bebês' : 
                  campaign.audience == 'CRIANCA' && campaign.unity_age == 'ANOS' ? 'crianças' :
                  campaign.audience == 'ADOLECESCENTE' ? 'adolescentes' :
                  campaign.audience == 'ADULTO' ? 'adultos' :
                  campaign.audience == 'IDOSO' ? 'idosos' :
                  campaign.audience == 'GESTANTE' ? 'gestantes' : null;

    let unidadeIdade = campaign.unity_age == 'AO_NASCER' ? 'meses' : 
                       campaign.unity_age == 'MESES' ? 'meses' :
                       campaign.unity_age == 'ANOS' ? 'anos' : null;

    const pushNotification = await PushNotifications.create({
    message: campaign.descricao + ' destinada a ' + publico + ' de ' + campaign.min_age + ' até ' + campaign.max_age + ' ' +  unidadeIdade,
    title: 'Campanha de prevenção para ' + vaccine.descricao,
    campaign_id: campaign.id
  });

  const usersExistentes = await User.findAll();

  console.log("Tamanho:", usersExistentes.length);

  for (let index = 0; index < usersExistentes.length; index++) {
    const userId = usersExistentes[index].id;
    console.log('UserId: ' + userId);   

    const userNotification = await UserNotifications.create({
      user_id: userId,
      push_notification_id: pushNotification.id,
      status: 'PENDENTE'
    });
  };                   
    
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

  async delete(req, res) {
    const { id } = req.params;

    const campaign = await Campaign.findByPk(id);

    if (!campaign) return res.status(400).json({ error: 'Campanha não existe' });

    await campaign.destroy().then(
      function(){
        return res.json('Campanha excluída com sucesso');
      }
    ).catch(
      function(err){
        console.log(err);
        return res.status(400).json({ error: 'Houve um erro ao excluir a campanha' });
      }
    )

    
  }
}

export default new CampaignController();

