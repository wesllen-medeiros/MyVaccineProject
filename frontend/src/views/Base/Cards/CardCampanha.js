import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardText,
  Fade,
  CardHeader,
  Label,
  Collapse,
  Badge,
} from "reactstrap";
import dateformat from "dateformat";

import api from "../../../services/index";

class CardCampanha extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: null,
      fadeIn: true,
      timeout: 300,
      unmountOnExit: false,
    };

    this.state = {
      campanhas: [],
    };
  }

  async componentDidMount() {
    let retorno = [];

    await api
      .get("campaign")
      .then(function (data) {
        retorno = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    this.setState({ campanhas: retorno });
  }

  toggle(id) {
    if (!this.state.collapse || id !== this.state.collapse) {
      this.setState({
        collapse: id,
      });
    } else if (this.state.collapse === id) {
      this.setState({ collapse: false });
    }
  }

  async toggleFade(id) {
    let mensagem_retorno = "";

    this.setState((prevState) => {
      return { [id]: !prevState };
    });

    await api
      .delete(`campaign/${id}`)
      .then(function (data) {
        mensagem_retorno = data.data;
        alert(data.data);
      })
      .catch(function (err) {
        console.log(err);
      });

    if (mensagem_retorno.indexOf("sucesso") !== -1) {
      this.setState({ unmountOnExit: true });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <br></br>
        <Row className="show-grid">
          <Col xs="10" md="10">
            {this.state.campanhas.map((post, index) => (
              <Fade
                style={{ display: "contents" }}
                key={index}
                timeout={this.state.timeout}
                in={
                  this.state[post.id] === undefined ||
                  this.state[post.id] === null
                    ? true
                    : this.state[post.id]
                }
                unmountOnExit={this.state.unmountOnExit}
              >
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ display: "inline-block" }}
                  key={index}
                >
                  <Card>
                    <CardHeader className="text-white bg-info">
                      <Badge
                        style={{ marginRight: "3%", padding: 6, width: 61}}
                        color={
                          new Date(post.dt_fim) < new Date()
                            ? "danger"
                            : "success"
                        }
                      >
                        {new Date(post.dt_fim) < new Date()
                          ? "Encerrada"
                          : "Ativa"}
                      </Badge>
                      {post.descricao} para{" "}
                      {post.audience === "CRIANCA"
                        ? "Crianças"
                        : post.audience === "ADULTO"
                        ? "Adultos"
                        : post.audience === "ADOLESCENTE"
                        ? "Adolescentes"
                        : post.audience === "IDOSO"
                        ? "Idosos"
                        : "Gestatens"}
                      <div className="card-header-actions">
                        {/*eslint-disable-next-line*/}
                        <a
                          className="card-header-action btn btn-minimize"
                          data-target="#collapseExample"
                          onClick={() => this.toggle(post.id)}
                        >
                          <i className={this.state.collapse === post.id ? "icon-arrow-down rotateup" : "icon-arrow-down rotatedown" }></i>
                        </a>
                        {/*eslint-disable-next-line*/}
                        <a
                          style={
                            new Date(post.dt_fim) < new Date()
                              ? {
                                  cursor: "not-allowed",
                                  pointerEvents: "all !important",
                                }
                              : { cursor: "pointer" }
                          }
                          className={
                            new Date(post.dt_fim) < new Date()
                              ? "card-header-action btn btn-close disabled"
                              : "card-header-action btn btn-close"
                          }
                          onClick={
                            new Date(post.dt_fim) < new Date()
                              ? undefined
                              : () => this.toggleFade(post.id)
                          }
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </a>
                      </div>
                    </CardHeader>
                    <Collapse
                      isOpen={this.state.collapse === post.id}
                      id="collapseExample"
                    >
                      <CardBody>
                        <Col>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-6">
                                <Label>
                                  <h6>Público-alvo</h6>
                                </Label>
                                <CardText>
                                  {post.audience === "CRIANCA"
                                    ? "CRIANÇA"
                                    : post.audience}
                                </CardText>
                              </div>
                              <div className="col-md-6">
                                <Label>
                                  <h6>Dose</h6>
                                </Label>
                                <CardText>{post.dose}</CardText>
                              </div>
                            </div>
                          </div>{" "}
                          <br></br>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-6">
                                <Label>
                                  <h6>Estado</h6>
                                </Label>
                                <CardText>{post.state}</CardText>
                              </div>
                              <div className="col-md-6">
                                <Label>
                                  <h6>Município</h6>
                                </Label>
                                <CardText>{post.municipio}</CardText>
                              </div>
                            </div>
                          </div>{" "}
                          <br></br>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-6">
                                <Label>
                                  <h6>Dt. Liberação</h6>
                                </Label>
                                <CardText>
                                  {dateformat(post.dt_ini, "dd/mm/yyyy")}
                                </CardText>
                              </div>
                              <div className="col-md-6">
                                <Label>
                                  <h6>Dt. Fim Liberação</h6>
                                </Label>
                                <CardText>
                                  {dateformat(post.dt_fim, "dd/mm/yyyy")}
                                </CardText>
                              </div>
                            </div>
                          </div>{" "}
                          <br></br>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-4">
                                <Label>
                                  <h6>Idade Inicial</h6>
                                </Label>
                                <CardText>{post.min_age}</CardText>
                              </div>
                              <div className="col-md-4">
                                <Label>
                                  <h6>Idade Limite</h6>
                                </Label>
                                <CardText>{post.max_age}</CardText>
                              </div>
                              <div className="col-md-4">
                                <Label>
                                  <h6>Tipo</h6>
                                </Label>
                                <CardText>
                                  {post.unity_age === "ANOS"
                                    ? "Anos"
                                    : post.unity_age === "MESES"
                                    ? "Meses"
                                    : "AO NASCER"}
                                </CardText>
                              </div>
                            </div>
                          </div>{" "}
                          <br></br>
                          <div className="container">
                            <div className="row">
                              <div className="col-md-8">
                                <Label>
                                  <h6>Estabelecimento</h6>
                                </Label>
                                <CardText>{post.Estab.nm_fantasia}</CardText>
                              </div>
                              <div className="col-md-4">
                                <Label>
                                  <h6>Vacina</h6>
                                </Label>
                                <CardText>{post.vaccine.name}</CardText>
                              </div>
                            </div>
                          </div>{" "}
                          <br></br>
                        </Col>
                      </CardBody>
                    </Collapse>
                  </Card>
                </Col>
              </Fade>
            ))}
          </Col>
          <Col xs="2">
            <Link to="../Forms/addCampanha">
              <button
                type="button"
                className="btn btn-primary btn-circle btn-xl"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CardCampanha;
