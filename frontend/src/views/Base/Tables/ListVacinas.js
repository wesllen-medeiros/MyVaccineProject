import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  FormGroup,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  CardFooter,
  Collapse,
} from "reactstrap";
import api from "../../../services/index";

import Select from "react-select";

class ListVacinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      list: false,
      collapse: null,
    };

    this.toggleAdd = this.toggleAdd.bind(this);
    this.toggleList = this.toggleList.bind(this);

    this.state = {
      currentPage: 0,
      aplication: [],
      min_age: "",
      max_age: "",
      disabelMinAge: false,
      disabelMaxAge: false,
      disabelTypeAge: false,
      name_vaccine: "",
      public_vaccine: [],
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
          value: "ADULTO",
          label: "Adulto",
        },
        {
          value: "ADOLESCENTE",
          label: "Adolescente",
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
    };
  }

  toggleAdd(name_vaccine = "") {
    this.setState({
      large: !this.state.large,
      name_vaccine: name_vaccine,
    });
  }

  toggleCollapse(id) {
    if (!this.state.collapse || id !== this.state.collapse) {
      this.setState({
        collapse: id,
      });
    } else if (this.state.collapse === id) {
      this.setState({ collapse: false });
    }
  }

  toggleList(public_vaccine = []) {
    this.setState({
      list: !this.state.list,
      public_vaccine: Array.from(public_vaccine),
    });
  }

  async getVaccines() {
    let retorno = [];
    await api
      .get("vaccine")
      .then(function (data) {
        retorno = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
        let erro = err.response.data.error;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      });

    this.pageSize = 6;
    this.pagesCount = Math.ceil(retorno.rows.length / this.pageSize);

    this.setState({ aplication: Array.from(retorno.rows) });
  }

  componentDidMount() {
    this.getVaccines();
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { audience, min_age, max_age, unity_age, name_vaccine } = this.state;

    console.log(audience, min_age, max_age, unity_age, name_vaccine);

    if (audience === null) {
      alert("O campo público deve ser preenchido");
    } else if (unity_age === null) {
      alert("O campo tipo de idade deve ser preenchido");
    } else if (min_age === null) {
      alert("O  campoidade mínima deve ser preenchido");
    } else if (max_age === null) {
      alert("O campo idade mínima deve ser preenchido");
    } else {
      await api
        .post("vaccine", {
          name: name_vaccine,
          public: [
            {
              audience: audience.value,
              min_age,
              max_age,
              unity_age: unity_age.value,
            },
          ],
        })
        .then(function (data) {
          alert(`Público alvo cadastrado com sucesso!`);
        })
        .catch(function (err) {
          let erro = err.response.data.erro_mensagem_publico;
          alert(`Algo inesperado aconteceu!\n ${erro}`);
        });

      this.toggleAdd();
    }
  };

  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index,
    });
  }

  render() {
    const {
      audience,
      audiences,
      disabelMinAge,
      disabelMaxAge,
      disabelTypeAge,
      unity_ages,
      min_age,
      max_age,
      unity_age,
      public_vaccine,
      currentPage,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <br></br>
        <Fragment>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>Vacinas
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th style={{ width: 360 }}>Nome</th>
                        <th style={{ width: 440 }}>Prevenção</th>
                        <th style={{ width: 230 }}>Dose</th>
                        <th style={{ width: 260 }}>Situação</th>
                        <th>Público-Alvo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.aplication
                        .slice(
                          currentPage * this.pageSize,
                          (currentPage + 1) * this.pageSize
                        )
                        .map((post) => (
                          <tr key={post.id}>
                            <td style={{ paddingTop: 30 }}>{post.name}</td>
                            <td style={{ paddingTop: 30 }}>
                              {post.prevention}
                            </td>
                            <td style={{ paddingTop: 30 }}>{post.dose}</td>
                            <td style={{ paddingTop: 30 }}>
                              <Badge color="success">Disponível</Badge>
                            </td>
                            <td>
                              <Button
                                style={{ marginRight: 5, width: 40 }}
                                color="success"
                                onClick={() => this.toggleAdd(post.name)}
                                className="mt-3"
                                active
                                tabIndex={-1}
                              >
                                <i
                                  className="fa fa-plus"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                              <Button
                                color="primary"
                                style={
                                  post.public.length === 0
                                    ? {
                                        cursor: "not-allowed",
                                        pointerEvents: "all !important",
                                      }
                                    : { cursor: "pointer" }
                                }
                                disabled={post.public.length === 0}
                                onClick={() => this.toggleList(post.public)}
                                className="mt-3"
                                active
                                tabIndex={-1}
                              >
                                <i
                                  className="fa fa-list-alt"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <div className="row row-cols-4">
                    <div className="col-8">
                      <Link to="../Forms/addVacina">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Adicionar
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-0">
                      <Pagination>
                        <PaginationItem>
                          <PaginationLink
                            first
                            tag="button"
                            style={
                              currentPage === 0
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            disabled={currentPage === 0}
                            onClick={(e) => this.handleClick(e, 0)}
                            href="#"
                          ></PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationLink
                            previous
                            tag="button"
                            style={
                              currentPage === 0
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            disabled={currentPage === 0}
                            onClick={(e) =>
                              this.handleClick(e, currentPage - 1)
                            }
                            href="#"
                          ></PaginationLink>
                        </PaginationItem>

                        {[...Array(this.pagesCount)].map((page, i) => (
                          <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink
                              tag="button"
                              onClick={(e) => this.handleClick(e, i)}
                              href="#"
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationLink
                            next
                            tag="button"
                            disabled={currentPage + 1 === this.pagesCount}
                            style={
                              currentPage + 1 === this.pagesCount
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            onClick={(e) =>
                              this.handleClick(e, currentPage + 1)
                            }
                            href="#"
                          ></PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                          <PaginationLink
                            last
                            tag="button"
                            style={
                              currentPage + 1 === this.pagesCount
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            disabled={currentPage + 1 === this.pagesCount}
                            onClick={(e) =>
                              this.handleClick(e, this.pagesCount - 1)
                            }
                            href="#"
                          ></PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal
            isOpen={this.state.list && public_vaccine.length > 0}
            toggle={this.toggleList}
            className={"modal-lg " + this.props.className}
          >
            <ModalHeader toggle={this.toggleList}>Público-Alvo</ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12" md="12">
                  {public_vaccine.map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="text-white bg-info">
                        {item.audience === "CRIANCA"
                          ? "CRIANÇA"
                          : item.audience}
                        <div className="card-header-actions">
                          {/*eslint-disable-next-line*/}
                          <a
                            className="card-header-action btn btn-minimize"
                            data-target="#collapseCard"
                            onClick={() => this.toggleCollapse(item.id)}
                          >
                            <i className="icon-arrow-up"></i>
                          </a>
                        </div>
                      </CardHeader>
                      <Collapse
                        isOpen={this.state.collapse === item.id}
                        id="collapseCard"
                      >
                        <CardBody>
                          <Col>
                            <div className="container">
                              <div className="row">
                                <div className="col">
                                  <Label>
                                    <h6>Idade Inicial</h6>
                                  </Label>
                                  <CardText>{item.min_age}</CardText>
                                </div>
                                <div className="col">
                                  <Label>
                                    <h6>Idade Limite</h6>
                                  </Label>
                                  <CardText>{item.max_age}</CardText>
                                </div>
                                <div className="col">
                                  <Label>
                                    <h6>Tipo</h6>
                                  </Label>
                                  <CardText>
                                    {item.unity_age === "ANOS"
                                      ? "Anos"
                                      : item.unity_age === "MESES"
                                      ? "Meses"
                                      : "AO_NASCER"}
                                  </CardText>
                                </div>
                              </div>
                            </div>{" "}
                            <br></br>
                          </Col>
                        </CardBody>
                      </Collapse>
                    </Card>
                  ))}
                </Col>
              </Row>
            </ModalBody>
          </Modal>

          <Modal
            isOpen={this.state.large}
            toggle={this.toggleAdd}
            className={"modal-lg " + this.props.className}
          >
            <ModalHeader toggle={this.toggleAdd}>Público-Alvo</ModalHeader>
            <ModalBody>
              <Row>
                <Col xs="12" sm="12">
                  <Card>
                    <Form
                      onSubmit={(e) =>
                        this.handleSubmit(e).then(() => this.getVaccines())
                      }
                      action=""
                      method="post"
                      encType="multipart/form-data"
                      className="form-horizontal"
                    >
                      <CardBody>
                        <FormGroup row>
                          <Col md="2" style={{ textAlign: "end" }}>
                            <Label style={{ paddingTop: 7 }} htmlFor="select">
                              Alvos
                            </Label>
                          </Col>
                          <Col xs="12" md="10">
                            <Select
                              required
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
                                    disabelMinAge:
                                      (audiencel !== null &&
                                        audiencel.value === "GESTANTE") ||
                                      (audiencel !== null &&
                                        audiencel.value === "CRIANCA" &&
                                        unity_age !== null &&
                                        unity_age.value === "AO_NASCER")
                                        ? true
                                        : false,
                                    disabelMaxAge:
                                      (audiencel !== null &&
                                        audiencel.value === "GESTANTE") ||
                                      (audiencel !== null &&
                                        audiencel.value === "CRIANCA" &&
                                        unity_age !== null &&
                                        unity_age.value === "AO_NASCER")
                                        ? true
                                        : false,
                                    disabelTypeAge:
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
                          <Col md="2" style={{ textAlign: "end" }}>
                            <Label style={{ paddingTop: 7 }} htmlFor="select">
                              Tipo idade
                            </Label>
                          </Col>
                          <Col xs="12" md="10">
                            <Select
                              required
                              isDisabled={disabelTypeAge}
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
                                    disabelMinAge:
                                      audience !== null &&
                                      audience.value === "CRIANCA" &&
                                      unity_agel !== null &&
                                      unity_agel.value === "AO_NASCER"
                                        ? true
                                        : false,
                                    disabelMaxAge:
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
                          <Col md="2" style={{ textAlign: "end" }}>
                            <Label
                              style={{ paddingTop: 7 }}
                              htmlFor="text-input"
                            >
                              Idade Minima
                            </Label>
                          </Col>
                          <Col xs="12" md="10">
                            <Input
                              style={
                                disabelMinAge
                                  ? {
                                      cursor: "not-allowed",
                                      pointerEvents: "all !important",
                                    }
                                  : { cursor: "default" }
                              }
                              required
                              disabled={disabelMinAge}
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
                          <Col md="2" style={{ textAlign: "end" }}>
                            <Label
                              style={{ paddingTop: 7 }}
                              htmlFor="text-input"
                            >
                              Idade Maxima
                            </Label>
                          </Col>
                          <Col xs="12" md="10">
                            <Input
                              style={
                                disabelMaxAge
                                  ? {
                                      cursor: "not-allowed",
                                      pointerEvents: "all !important",
                                    }
                                  : { cursor: "default" }
                              }
                              required
                              disabled={disabelMaxAge}
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
                      </CardBody>
                      <CardFooter>
                        <Button type="submit" size="sm" color="primary">
                          <i className="fa fa-dot-circle-o"></i>OK
                        </Button>
                      </CardFooter>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </Fragment>
      </div>
    );
  }
}

export default ListVacinas;
