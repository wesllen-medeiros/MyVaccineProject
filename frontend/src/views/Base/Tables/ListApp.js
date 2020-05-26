import React,{Component} from 'react';
import {Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {Link} from 'react-router-dom';

class ListApp extends Component {


  render(){
    return (
      <div className="animated fadeIn">
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
                        <th>Usuário</th>
                        <th>teste</th>
                        <th>teste</th>
                        <th>teste</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>teste</td>
                        <td>2012/01/01</td>
                        <td>teste</td>
                        <td>
                          <Badge color="success">Active</Badge>
                       </td>
                      </tr>
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



