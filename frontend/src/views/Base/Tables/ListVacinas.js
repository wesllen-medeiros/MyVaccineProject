import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import api from '../../../services/index';

class ListVacinas extends Component {
  state = {
    aplication: [],
  };

  async componentDidMount() {
    try {
      const res = await api.get('vaccine');


      this.setState({ aplication: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
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
                      <th>Descrição</th>
                      <th>Fornecedor</th>
                      <th>Tipo</th>
                      <th>Status</th>
                      <th>Observação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.aplication.map(post => (
  
                        <tr  key={post.id}>
                          <td>{post.descricao}</td>
                          <td>{post.fornec}</td>
                          <td>{post.und_medida}</td>
                          <td>
                            <Badge color="success">Disponível</Badge>
                          </td>
                          <td>{post.obs}</td>
                        </tr>
   
                    ))}
                  </tbody>
                </Table>
                <div className="row row-cols-4">
                  <div className="col-8">
                    <Link to="../Forms/addVacina">
                      <Button color="primary" className="mt-3" active tabIndex={-1}>Adicionar</Button>
                    </Link>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-0">
                    <Pagination>
                      <PaginationItem>
                        <PaginationLink previous tag="button"></PaginationLink>
                      </PaginationItem>
                      <PaginationItem active>
                        <PaginationLink tag="button">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink tag="button">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink tag="button">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink tag="button">4</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next tag="button"></PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
};

export default ListVacinas;
