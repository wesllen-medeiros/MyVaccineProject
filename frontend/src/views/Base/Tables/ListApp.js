import React from 'react';
import {Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

function ListApp() {

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
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Derick Maximinus</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Friderik Dávid</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>
                <Button color="primary" block>Adicionar</Button>
                <Button color="danger" block>Excluir</Button>
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

  export default ListApp;



