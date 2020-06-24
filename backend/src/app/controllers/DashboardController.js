import Estab from '../models/Estab';
import { QueryTypes } from 'sequelize';
import Application from '../models/Application';

class DashboardController {
 
  async indexAppliedVaccines(req , res) {

    let dashboardVaccine = {
      conteudo: [{}]
    };

    const listVaccineApplication = await Application.sequelize.query(`select vaccine_id, name  from (
                                                                        select a.vaccine_id, v.name, count(a.*) from applications a
                                                                         join vaccines v on (v.id = a.vaccine_id) 
                                                                         group by a.vaccine_id, v.name
                                                                         order by count(a.*) desc
                                                                       LIMIT 4 ) as tab_principal `, 
                                                                      { type: QueryTypes.SELECT });

    for (let index = 0; index < listVaccineApplication.length; index++) {
      const element = listVaccineApplication[index];
      console.log(element.vaccine_id);

      let dados = await Application.sequelize.query(`select EXTRACT(YEAR FROM ap.dt_aplicacao) as ano, 
                                                            EXTRACT(MONTH FROM ap.dt_aplicacao) as mes, 
                                                            count(ap.*) 
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
}

export default new DashboardController();