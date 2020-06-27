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
    disableMinAge: false,
    disableMaxAge: false,
    disableTypeAge: false,
    disabledCity: true,
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
    state: "",
    selectStates: [],
    selectCities: [],
  };

  sortOn(arr, prop) {
    arr.sort(function (a, b) {
      if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] > b[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  populateStateSelect() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((states) => {
        this.sortOn(states, "nome");
        this.setState({ selectStates: states }, function () {});
      });
  }

  populateCitySelect() {
    var elementCities = document.getElementById("cities");

    let state = this.state.state.id;

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
    )
      .then((res) => res.json())
      .then((cities) => {
        this.sortOn(cities, "nome");

        elementCities.removeAttribute("disabled");

        this.setState(
          { selectCities: cities, disabledCity: false },
          function () {}
        );
      });
  }

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

    console.log(this.state);

    if (state === null) {
      alert("O campo estado deve ser preenchido");
    } else if (municipio === null) {
      alert("O campo município deve ser preenchido");
    } else if (audience === null) {
      alert("O campo público deve ser preenchido");
    } else if (unity_age === null) {
      alert("O campo tipo de idade deve ser preenchido");
    } else if (min_age === null) {
      alert("O campo idade mínima deve ser preenchido");
    } else if (max_age === null) {
      alert("O campo idade mínima deve ser preenchido");
    } else if (selected_estab === null) {
      alert("O campo estabelecimento deve ser preenchido");
    } else if (selected_vaccine === null) {
      alert("O campo vacina deve ser preenchido");
    } else {
      await api
        .post("campaign", {
          descricao,
          dt_ini: dateformat(
            new Date(dt_ini).setDate(new Date(dt_ini).getDate() + 1)
          ),
          dt_fim: dateformat(
            new Date(dt_fim).setDate(new Date(dt_fim).getDate() + 1)
          ),
          state: state.nome,
          municipio: municipio.nome,
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
    }
  };

  async componentDidMount() {
    this.populateStateSelect();

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
      selectStates,
      selectCities,
      municipio,
      audience,
      audiences,
      disableMinAge,
      disableMaxAge,
      disableTypeAge,
      disabledCity,
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
                      required
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
                      required
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
                      required
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
                      options={selectStates}
                      value={state}
                      getOptionLabel={(statel) => statel.nome}
                      getOptionValue={(statel) => statel.nome}
                      onChange={(statel) =>
                        this.setState(
                          {
                            state: statel,
                          },
                          function () {
                            this.state.state !== null
                              ? this.populateCitySelect()
                              : this.setState(
                                  {
                                    municipio: "",
                                    selectCities: [],
                                    disabledCity: true,
                                  },
                                  function () {}
                                );
                          }
                        )
                      }
                      placeholder="Selecione um estado"
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
                    <Select
                      isDisabled={disabledCity}
                      className="disabled"
                      id="cities"
                      isClearable={true}
                      isSearchable={true}
                      options={selectCities}
                      value={municipio}
                      getOptionLabel={(citiel) => citiel.nome}
                      getOptionValue={(citiel) => citiel.nome}
                      onChange={(citiel) =>
                        this.setState(
                          {
                            municipio: citiel,
                          },
                          function () {}
                        )
                      }
                      placeholder="Selecione um município"
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
                        this.setState(
                          {
                            audience: audiencel,
                            disableMinAge:
                              (audiencel !== null &&
                                audiencel.value === "GESTANTE") ||
                              (audiencel !== null &&
                                audiencel.value === "CRIANCA" &&
                                unity_age !== null &&
                                unity_age.value === "AO_NASCER")
                                ? true
                                : false,
                            disableMaxAge:
                              (audiencel !== null &&
                                audiencel.value === "GESTANTE") ||
                              (audiencel !== null &&
                                audiencel.value === "CRIANCA" &&
                                unity_age !== null &&
                                unity_age.value === "AO_NASCER")
                                ? true
                                : false,
                            disableTypeAge:
                              (audiencel !== null &&
                                audiencel.value === "GESTANTE") ||
                              (audiencel !== null &&
                                audiencel.value === "CRIANCA" &&
                                unity_age !== null &&
                                unity_age.value === "AO_NASCER")
                                ? true
                                : false,
                            min_age:
                              (audiencel !== null &&
                                audiencel.value === "GESTANTE") ||
                              (audiencel !== null &&
                                audiencel.value === "CRIANCA" &&
                                unity_age !== null &&
                                unity_age.value === "AO_NASCER")
                                ? 0
                                : false,
                            max_age:
                              (audiencel !== null &&
                                audiencel.value === "GESTANTE") ||
                              (audiencel !== null &&
                                audiencel.value === "CRIANCA" &&
                                unity_age !== null &&
                                unity_age.value === "AO_NASCER")
                                ? 0
                                : false,
                            unity_age:
                              audiencel !== null &&
                              (audiencel.value === "GESTANTE" ||
                                audiencel.value === "ADOLESCENTE" ||
                                audiencel.value === "IDOSO" ||
                                audiencel.value === "ADULTO")
                                ? {
                                    value: "ANOS",
                                    label: "Anos",
                                  }
                                : unity_age !== null
                                ? unity_age
                                : {
                                    value: "MESES",
                                    label: "Meses",
                                  },
                          },
                          function () {}
                        )
                      }
                      placeholder="Selecione um público"
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label style={{ paddingTop: 8 }} htmlFor="select">
                      Tipo Idade
                    </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Select
                      isDisabled={disableTypeAge}
                      isClearable={true}
                      isSearchable={true}
                      options={unity_ages}
                      value={unity_age}
                      getOptionLabel={(unity_agel) => unity_agel.label}
                      getOptionValue={(unity_agel) => unity_agel.value}
                      onChange={(unity_agel) =>
                        this.setState(
                          {
                            unity_age: unity_agel,
                            disableMinAge:
                              audience !== null &&
                              audience.value === "CRIANCA" &&
                              unity_agel !== null &&
                              unity_agel.value === "AO_NASCER"
                                ? true
                                : false,
                            disableMaxAge:
                              audience !== null &&
                              audience.value === "CRIANCA" &&
                              unity_agel !== null &&
                              unity_agel.value === "AO_NASCER"
                                ? true
                                : false,
                            min_age:
                              audience !== null &&
                              audience.value === "CRIANCA" &&
                              unity_agel !== null &&
                              unity_agel.value === "AO_NASCER"
                                ? 0
                                : 0,
                            max_age:
                              audience !== null &&
                              audience.value === "CRIANCA" &&
                              unity_agel !== null &&
                              unity_agel.value === "AO_NASCER"
                                ? 0
                                : 0,
                          },
                          function () {}
                        )
                      }
                      placeholder="Selecione um tipo de unidade para idade"
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
                      required
                      style={
                        disableMinAge
                          ? {
                              cursor: "not-allowed",
                              pointerEvents: "all !important",
                            }
                          : { cursor: "default" }
                      }
                      disabled={disableMinAge}
                      type="number"
                      min="0"
                      max="99"
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
                      required
                      style={
                        disableMaxAge
                          ? {
                              cursor: "not-allowed",
                              pointerEvents: "all !important",
                            }
                          : { cursor: "default" }
                      }
                      disabled={disableMaxAge}
                      type="number"
                      min="0"
                      max="99"
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
