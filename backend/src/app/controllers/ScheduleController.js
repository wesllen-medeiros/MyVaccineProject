import Schedule from '../models/Schedule';
import Vaccine from '../models/vaccine';
import User from '../models/User';

class ScheduleController {
    async store(req , res) {

        console.log(req.body);

        const vaccine = await Vaccine.findByPk(req.body.vaccine_id);

        if (!vaccine) {
            return res.status(400).json({error: 'Vacina incorreta'});
        }        
        const user = await User.findByPk(req.body.user_id);
    
        if (!user) {
        return res.status(400).json({error: 'Usuário incorreta'});
        }
        
        const scheduleExist = await Schedule.findOne({ where: {user_id: req.body.user_id}});

        if (scheduleExist) {
            return res.status(400).json({error: 'Já existe um agentamento cadastrado para este usuário na data informada, para esta vacina e dose' });
        }

        const schedule = await Schedule.create(req.body);

        return res.json(schedule);
    }
}

export default new ScheduleController();