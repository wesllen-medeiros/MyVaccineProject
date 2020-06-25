import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  CardHeader,
} from "reactstrap";

import Select from "react-select";

import api from "../../../services/index";
import dateformat from "dateformat";

class addCampanha extends Component {
  state = {
    descricao: "",
    dt_ini: "",
    dt_fim: "",
    municipio: "",
    min_age: "",
    max_age: "",
    selected_estab: "",
    estabelecimentos: [],
    selected_vaccine: "",
    vaccines: [],
    dose: {
      nm_dose: "1 Dose",
      descricao: "Uma",
    },
    doses: [
      {
        nm_dose: "1 Dose",
        descricao: "Uma",
      },
      {
        nm_dose: "2 Doses",
        descricao: "Duas",
      },
      {
        nm_dose: "3 Doses",
        descricao: "Três",
      },
      {
        nm_dose: "4 Doses",
        descricao: "Quatro",
      },
    ],
    audience: {
      value: "CRIANCA",
      label: "Criança",
    },
    audiences: [
      {
        value: "CRIANCA",
        label: "Criança",
      },
      {
        value: "ADOLESCENTE",
        label: "Adolescente",
      },
      {
        value: "ADULTO",
        label: "Adulto",
      },
      {
        value: "IDOSO",
        label: "Idoso",
      },
      {
        value: "GESTANTE",
        label: "Gestante",
      },
    ],
    unity_age: {
      value: "MESES",
      label: "Meses",
    },
    unity_ages: [
      {
        value: "MESES",
        label: "Meses",
      },
      {
        value: "ANOS",
        label: "Anos",
      },
      {
        value: "AO_NASCER",
        label: "Ao Nascer",
      },
    ],
    state: {
      nm_state: "Acre",
    },
    states: [
      { nm_state: "Acre" },
      { nm_state: "Alagoas" },
      { nm_state: "Amapá" },
      { nm_state: "Amazonas" },
      { nm_state: "Bahia" },
      { nm_state: "Ceará" },
      { nm_state: "Distrito Federal" },
      { nm_state: "Espírito Santo" },
      { nm_state: "Goiás" },
      { nm_state: "Maranhão" },
      { nm_state: "Mato Grosso" },
      { nm_state: "Mato Grosso do Sul" },
      { nm_state: "Minas Gerais" },
      { nm_state: "Pará" },
      { nm_state: "Paraíba" },
      { nm_state: "Paraná" },
      { nm_state: "Santa Catarina" },
      { nm_state: "São Paulo" },
      { nm_state: "Sergipe" },
      { nm_state: "Tocantins" },
    ],
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      descricao,
      dt_ini,
      dt_fim,
      state,
      municipio,
      audience,
      min_age,
      max_age,
      unity_age,
      dose,
      selected_estab,
      selected_vaccine,
    } = this.state;

    await api
      .post("campaign", {
        descricao,
        dt_ini: dateformat(
          new Date(dt_ini).setDate(new Date(dt_ini).getDate() + 1)
        ),
        dt_fim: dateformat(
          new Date(dt_fim).setDate(new Date(dt_fim).getDate() + 1)
        ),
        state: state.nm_state,
        municipio,
        audience: audience.value,
        min_age,
        max_age,
        unity_age: unity_age.value,
        dose: dose.nm_dose,
        estab_id: selected_estab.id,
        vaccine_id: selected_vaccine.id,
      })
      .then(function () {
        alert("Campanha cadastrada com sucesso!");
      })
      .catch(function (err) {
        console.log(err.response.data.error);
        alert(
          `Não foi possível concluir a operação!\n${err.response.data.error}`
        );
      });

    this.props.history.push("../cards/CardCampanha");
    //this.props.history.push('ListVacina')
  };

  async componentDidMount() {
    let retornoEstabs = [];
    let retornoVaccines = [];

    await api
      .get("estab")
      .then(function (data) {
        retornoEstabs = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    this.setState({ estabelecimentos: retornoEstabs });

    await api
      .get("vaccine")
      .then(function (data) {
        retornoVaccines = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    this.setState({ vaccines: retornoVaccines.rows });
  }

  render() {
    const {
      descricao,
      dt_ini,
      dt_fim,
      state,
      states,
      municipio,
      audience,
      audiences,
      min_age,
      max_age,
      unity_age,
      unity_ages,
      dose,
      doses,
      selected_estab,
      estabelecimentos,
      selected_vaccine,
      vaccines,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Col xs="12" sm="8">
          <Card>
            <CardHeader>
              <strong>Cadastro de Campanhas</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Descrição
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      name="text-input"
                      placeholder="Descrição da Campanha"
                      onChange={(e) =>
                        this.setState({ descricao: e.target.value })
                      }
                      value={descricao}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="date-input">
                      Inicio
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      onChange={(e) =>
                        this.setState({ dt_ini: e.target.value })
                      }
                      value={dt_ini}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="date-input">
                      Fim
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="date"
                      id="date-input"
                      name="date-input"
                      placeholder="date"
                      onChange={(e) =>
                        this.setState({ dt_fim: e.target.value })
                      }
                      value={dt_fim}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Estado
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={states}
                      value={state}
                      getOptionLabel={(statel) => statel.nm_state}
                      getOptionValue={(statel) => statel.nm_state}
                      onChange={(statel) => this.setState({ state: statel })}
                      placeholder="Selecione um público"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Município
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      name="text-input"
                      placeholder="Informe o município da campanha"
                      onChange={(e) =>
                        this.setState({ municipio: e.target.value })
                      }
                      value={municipio}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="select">
                      Público
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={audiences}
                      value={audience}
                      getOptionLabel={(audiencel) => audiencel.label}
                      getOptionValue={(audiencel) => audiencel.value}
                      onChange={(audiencel) =>
                        this.setState({ audience: audiencel })
                      }
                      placeholder="Selecione um público"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Idade Mínima
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      name="text-input"
                      placeholder="Informe a idade mínima para aplicação da vacina"
                      onChange={(e) =>
                        this.setState({ min_age: e.target.value })
                      }
                      value={min_age}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Idade Máxima
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      id="text-input"
                      name="text-input"
                      placeholder="Informe a idade máxima para aplicação da vacina"
                      onChange={(e) =>
                        this.setState({ max_age: e.target.value })
                      }
                      value={max_age}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="select">
                      Tipo
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={unity_ages}
                      value={unity_age}
                      getOptionLabel={(unity_agel) => unity_agel.label}
                      getOptionValue={(unity_agel) => unity_agel.value}
                      onChange={(unity_agel) =>
                        this.setState({ unity_age: unity_agel })
                      }
                      placeholder="Selecione um tipo de unidade para idade"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="select">
                      Dose
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={doses}
                      value={dose}
                      getOptionLabel={(dosel) => dosel.descricao}
                      getOptionValue={(dosel) => dosel.nm_dose}
                      onChange={(dosel) => this.setState({ dose: dosel })}
                      placeholder="Selecione uma dose"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Estabelecimento
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={estabelecimentos}
                      value={selected_estab}
                      getOptionLabel={(estab) => estab.nm_fantasia}
                      getOptionValue={(estab) => estab.id}
                      onChange={(estab) =>
                        this.setState({ selected_estab: estab })
                      }
                      placeholder="Selecione o estabelecimento"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="text-input">
                      Vacina
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isClearable={true}
                      isSearchable={true}
                      options={vaccines}
                      value={selected_vaccine}
                      getOptionLabel={(vaccine) => vaccine.name}
                      getOptionValue={(vaccine) => vaccine.id}
                      onChange={(vaccine) =>
                        this.setState({ selected_vaccine: vaccine })
                      }
                      placeholder="Selecione a vacina"
                    />
                  </Col>
                </FormGroup>

                <Col xs="5">
                  <Button
                    type="submit"
                    color="primary"
                    className="mt-4"
                    active
                    tabIndex={-1}
                  >
                    Salvar
                  </Button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default addCampanha;
