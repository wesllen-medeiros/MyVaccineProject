import Vaccine from "../models/vaccine";
import PublicVaccination from "../models/PublicVaccination";

class VaccineController {
  async store(req, res) {
    let vaccine = null;

    let erro_mensagem_publico = "";

    let erro_mensagem_vacina = "";

    let count_erros = 0;

    const { name, prevention, dose, ...data } = req.body;

    const VaccineExist = await Vaccine.findOne({ where: { name } });

    if (!VaccineExist) {
      vaccine = await Vaccine.create({
        name,
        prevention,
        dose,
      }); /*retorna para o front */
    } else {
      erro_mensagem_vacina =
        "Esta Vacina não foi cadastrada, pois já existe outra cadastrada com este nome";
    }

    if (data.public !== undefined) {
      for (let index = 0; index < data.public.length; index++) {
        let PublicVaccinationExist = await PublicVaccination.findOne({
          where: {
            audience: data.public[index].audience,
            min_age: data.public[index].min_age,
            max_age: data.public[index].max_age,
            unity_age: data.public[index].unity_age,
            vaccine_id: VaccineExist ? VaccineExist.id : vaccine.id,
          },
        });

        if (PublicVaccinationExist) {
          count_erros++;
          erro_mensagem_publico +=
            "Já existe um público " +
            data.public[index].audience +
            " cadastrado com estas informações para esta vacina! ";
        } else {
          await PublicVaccination.create({
            audience: data.public[index].audience,
            min_age: data.public[index].min_age,
            max_age: data.public[index].max_age,
            unity_age: data.public[index].unity_age,
            vaccine_id: VaccineExist ? VaccineExist.id : vaccine.id,
          });
        }
      }
    }

    if (
      erro_mensagem_publico != "" &&
      count_erros == data.public.length &&
      erro_mensagem_vacina != ""
    ) {
      return res.status(400).json({
        erro_mensagem_vacina,
        erro_mensagem_publico,
      });
    }

    if (data.public === undefined && erro_mensagem_vacina != "") {
      console.log("teste");
      return res.status(400).json({
        erro_mensagem_vacina,
      });
    } else {
      vaccine = await Vaccine.findAll({
        include: [
          {
            model: PublicVaccination,
            as: "public",
          },
        ],
      });

      return res.json(vaccine);
    }
  }

  async index(req, res) {
    let retornoVacinas = [];

    await Vaccine.findAndCountAll({
      include: [
        {
          model: PublicVaccination,
          as: "public",
        },
      ],
      order: [
        ["name", "ASC"],
        ["public", "audience", "ASC"],
      ],
    }).then(function (result) {
      retornoVacinas = result;
    });

    return res.json(retornoVacinas);
  }
}

export default new VaccineController();
