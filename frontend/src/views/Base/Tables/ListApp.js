import React, { Component } from "react";
import {
  Button,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Collapse,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import dateformat from "dateformat";

import api from "../../../services/index";

class ListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: false,
    };

    this.toggleList = this.toggleList.bind(this);

    this.state = {
      aplic: [],
      application: [],
      user: [],
      estab: [],
      currentPage: 0,
      startIndex: 0,
      endIndex: 10,
    };
  }

  toggleList(application = []) {
    this.setState({
      list: !this.state.list,
      application: application,
      user: application.user,
      estab: application.estab,
    });
  }

  async componentDidMount() {
    let retorno = [];
    await api
      .get("application")
      .then(function (data) {
        retorno = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
        let erro = err.response.data.error;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      });

    this.pageSize = 7;
    this.pagesCount = Math.ceil(retorno.rows.length / this.pageSize);

    this.setState({ aplic: Array.from(retorno.rows) });
  }

  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index,
    });
  }

  render() {
    const {
      application,
      user,
      estab,
      currentPage,
      startIndex,
      endIndex,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <br></br>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Aplicações
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th style={{ width: 470 }}>Paciente</th>
                      <th style={{ width: 280 }}>Dt. Aplicação</th>
                      <th style={{ width: 285 }}>Vacina</th>
                      <th style={{ width: 185 }}>Dose</th>
                      <th style={{ width: 207 }}>Situação</th>
                      <th>Detalhe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.aplic
                      .slice(
                        currentPage * this.pageSize,
                        (currentPage + 1) * this.pageSize
                      )
                      .map((post) => (
                        <tr key={post.id}>
                          <td style={{ paddingTop: 30 }}>{post.user.name}</td>
                          <td style={{ paddingTop: 30 }}>
                            {dateformat(post.dt_aplicacao, "dd/mm/yyyy")}
                          </td>
                          <td style={{ paddingTop: 30 }}>
                            {post.vaccine.name}
                          </td>
                          <td style={{ paddingTop: 30 }}>{post.dose}</td>
                          <td style={{ paddingTop: 30 }}>
                            <Badge color="success">Concluída</Badge>
                          </td>
                          <td>
                            <Button
                              color="primary"
                              className="mt-3"
                              onClick={() => this.toggleList(post)}
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
                <Link to="../Forms/addAplicacao">
                  <Button color="primary" className="mt-3" active tabIndex={-1}>
                    Adicionar
                  </Button>
                </Link>
                <div className="row justify-content-center" hidden={this.pagesCount < 2}>
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
                          onClick={(e) => this.handleClick(e, currentPage - 1)}
                          href="#"
                        ></PaginationLink>
                      </PaginationItem>

                      {[...Array(this.pagesCount)]
                        .slice(startIndex, endIndex)
                        .map((page, i) => (
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
                          style={
                            currentPage + 1 === this.pagesCount
                              ? { cursor: "not-allowed" }
                              : { cursor: "pointer" }
                          }
                          disabled={currentPage + 1 === this.pagesCount}
                          onClick={(e) => this.handleClick(e, currentPage + 1)}
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
          isOpen={this.state.list}
          toggle={this.toggleList}
          className={"modal-lg " + this.props.className}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleList}>Detalhe</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" md="12">
                <Card key={application.id}>
                  <CardHeader className="text-white bg-info">
                    {user === undefined ? "teste" : user.name}
                  </CardHeader>
                  <Collapse isOpen={true} id="collapseCard">
                    <CardBody>
                      <Col>
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <Label>
                                <h6>Aplicada por</h6>
                              </Label>
                              <CardText>{application.nm_agente}</CardText>
                            </div>
                            <div className="col">
                              <Label>
                                <h6>Estabelecimento</h6>
                              </Label>
                              <CardText>
                                {estab === undefined
                                  ? "teste"
                                  : estab.nm_fantasia}
                              </CardText>
                            </div>
                          </div>
                        </div>{" "}
                        <br></br>
                        <div className="container">
                          <div className="row">
                            <div className="col">
                              <Label>
                                <h6>Reações</h6>
                              </Label>
                              <CardText>{application.reacao}</CardText>
                            </div>
                          </div>
                        </div>
                        <br></br>
                      </Col>
                    </CardBody>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ListApp;
