import { QueryTypes } from 'sequelize';
import Application from '../models/Application';
import Campaign from '../models/Campaign';
import Vaccine from '../models/vaccine';

class DashboardController {
 
  async indexAppliedVaccines(req , res) {

    let dashboardVaccine = {
      conteudo: [{}]
    };

    const listVaccineApplication = await Application.sequelize.query(`select vaccine_id, name from (
                                                                        select a.vaccine_id, v.name, count(a.*) from applications a
                                                                         join vaccines v on (v.id = a.vaccine_id) 
                                                                         group by a.vaccine_id, v.name
                                                                         order by count(a.*) desc
                                                                       LIMIT 4 ) as tab_principal `, 
                                                                      { type: QueryTypes.SELECT });

    for (let index = 0; index < listVaccineApplication.length; index++) {
      const element = listVaccineApplication[index];

      let dados = await Application.sequelize.query(`select EXTRACT(YEAR FROM ap.dt_aplicacao) as ano, 
                                                            EXTRACT(MONTH FROM ap.dt_aplicacao) as mes, 
                                                            count(ap.*) as aplicacoes
                                                       from applications ap 
                                                      where ap.vaccine_id = ${element.vaccine_id}
                                                      and EXTRACT(YEAR FROM ap.dt_aplicacao) = date_part('year', current_timestamp)
                                                      group by ano, mes, ap.vaccine_id 
                                                      order by ano, mes `, 
                                                     { type: QueryTypes.SELECT });
      
      dashboardVaccine.conteudo[index] ={
                                      name: element.name, 
                                      dados: dados
                                    }
    }
    return res.json(dashboardVaccine);
  }

  async indexCampaignVaccines(req , res) {

    let dashboardCampaignVaccine = {
      conteudo: [{}]
    };

    const listCampaign = await Campaign.sequelize.query(`select c.descricao, 
                                                                c.vaccine_id,
                                                                c.dt_ini, c.dt_fim 
                                                           from campaigns c
                                                           where EXTRACT(YEAR FROM c.dt_ini) = date_part('year', current_timestamp) `, 
                                                  { type: QueryTypes.SELECT });

     for (let index = 0; index < listCampaign.length; index++) {
      
      const element = listCampaign[index];

      let dados = await Application.sequelize.query(`select EXTRACT(YEAR FROM ap.dt_aplicacao) as ano, 
                                                            EXTRACT(MONTH FROM ap.dt_aplicacao) as mes, 
                                                            count(ap.*) as aplicacoes
                                                       from applications ap 
                                                      where ap.vaccine_id = ${element.vaccine_id}
                                                      and EXTRACT(YEAR FROM ap.dt_aplicacao) = date_part('year', current_timestamp)
                                                      and ap.dt_aplicacao between TO_TIMESTAMP('${new Date(element.dt_ini).toLocaleDateString('pt-BR')}', 'YYYY-MM-DD HH24:MI:SS') and TO_TIMESTAMP('${new Date(element.dt_fim).toLocaleDateString('pt-BR')}', 'YYYY-MM-DD HH24:MI:SS')
                                                      group by ano, mes, ap.vaccine_id
                                                      having count(ap.*) > 0
                                                      order by ano, mes `, 
                                                     { type: QueryTypes.SELECT });
      if (dados.length > 0 && Array.isArray(dados)){
        dashboardCampaignVaccine.conteudo[index] ={
                                        mes_inicial: new Date(element.dt_ini).getMonth() + 1,
                                        ano_inicial: new Date(element.dt_ini).getFullYear(),
                                        mes_final: new Date(element.dt_fim).getMonth() + 1,
                                        ano_final: new Date(element.dt_fim).getFullYear(),
                                        descricao: element.descricao,
                                        dados: dados
                                      }
      }

    }

    let removeNull = JSON.stringify(dashboardCampaignVaccine).replace(',null', '').replace(',null,null', '');

    return res.json(JSON.parse(removeNull));
  }
}

export default new DashboardController();