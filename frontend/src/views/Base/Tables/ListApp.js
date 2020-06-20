import React,{Component} from 'react';
import {Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import dateformat from 'dateformat'

import api from '../../../services/index';

class ListApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    this.state = {
      aplic: [],
    }

  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  async componentDidMount() {
    try {
      const res = await api.get('application');


      this.setState({ aplic: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  render(){
  
    return (
      <div className="animated fadeIn"><br></br>
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
                        <th>Paciente</th>
                        <th>Dt. Aplicação</th>
                        <th>Vacina</th>
                        <th>Dose</th>
                        <th>Situação</th>
                        <th>Detalhe</th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.state.aplic.map(post => (
                        <tr  key={post.id}>
                          <td>{post.user.name}</td>
                          <td>{dateformat(new Date(post.dt_aplicacao).setDate(new Date(post.dt_aplicacao).getDate() + 1), 'dd/mm/yyyy')}</td>
                          <td>{post.vaccine_id}</td>
                          <td>{post.dose}</td>
                          <td>
                            <Badge color="success">Concluída</Badge>
                          </td>
                          <td>
                             <Button color="primary" className="mt-3" active tabIndex={-1}><i class="fa fa-list-alt" aria-hidden="true"></i></Button>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </Table>
                <Link to="../Forms/addAplicacao">
                  <Button color="primary" className="mt-3" active tabIndex={-1}>Adicionar</Button>
                </Link>
             <div class="row justify-content-center">
               <div class="col-0">
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

  export default ListApp;



