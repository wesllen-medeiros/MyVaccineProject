import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table,
  FormGroup,
  Input,
  Label,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  CardFooter,
} from 'reactstrap';
import api from '../../../services/index';

class ListVacinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    this.state = {
      aplication: [],
      audience: '',
      min_age: '',
      max_age: '', 
      unity_age: '',
    }

  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,

    });
    
  }

  async componentDidMount() {
    try {
      const res = await api.get('vaccine');


      this.setState({ aplication: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  
  handleSubmit = async (e) => {
    e.preventDefault();

    const { audience,
      min_age,
      max_age, 
      unity_age,
    } = this.state;

    console.log(this.state)

    await api.post('vaccine', { audience,min_age,max_age,unity_age });

    this.props.history.push('../tables/ListVacinas');
    //this.props.history.push('ListVacina')
  }

  render() {

    const{
      audience,
      min_age,
      max_age, 
      unity_age,
    } = this.state;

    return (
      <div className="animated fadeIn"><br></br>
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
                      <th>Nome</th>
                      <th>Prevenção</th>
                      <th>Dose</th>
                      <th>Situação</th>
                      <th>Público-Alvo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.aplication.map(post => (
                        <tr  key={post.id}>
                          <td>{post.name}</td>
                          <td>{post.prevention}</td>
                          <td>{post.dose}</td>
                          <td>
                            <Badge color="success">Disponível</Badge>
                          </td>
                          <td>
                             <Button color="success" onClick={this.toggleLarge} className="mt-3" active tabIndex={-1}><i class="fa fa-plus" aria-hidden="true"></i></Button>
                             <Button color="primary" className="mt-3" active tabIndex={-1}><i class="fa fa-list-alt" aria-hidden="true"></i></Button>
                          </td>
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

        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
            className={'modal-lg ' + this.props.className}>
            <ModalHeader toggle={this.toggleLarge}>Público-Alvo</ModalHeader>
            <ModalBody>
            <Form onSubmit={e => this.handleSubmit(e)} >
              <Row>
                <Col xs="12" sm="12">
                  <Card>
                    <CardBody>
                      <Form action="" method="post" encType="multipart/form-data" className="form-horizontal" >

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="select">Alvos</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="select" name="select" id="select" value={audience} onChange={(e) => this.setState({ audience: e.target.value })}>
                              <option value="0">CRIANÇA</option>
                              <option value="1">ADULTO</option>
                              <option value="2">ADOLECENTE</option>
                            </Input>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Idade Minima</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="text"
                             id="text-input"
                             name="text-input"
                             onChange={(e) => this.setState({ min_age: e.target.value })}
                             value={min_age}
                             />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="text-input">Idade Maxima</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="text"
                             id="text-input"
                             name="text-input"
                             onChange={(e) => this.setState({ max_age: e.target.value })}
                             value={max_age}
                             />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="select">Tipo idade</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="select" name="select" id="select" value={unity_age} onChange={(e) => this.setState({ unity_age: e.target.value })}>
                              <option value="MESES">Meses</option>
                              <option value="ANOS">Anos</option>
                              <option value="AO_NASCER">Ao Nascer</option>
                            </Input>
                          </Col>
                        </FormGroup>

                      </Form>
                    </CardBody>
                    <CardFooter>
                      <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>OK</Button>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </Form>
            </ModalBody>
          </Modal>
      </Fragment>
      </div>

    );
  }
};

export default ListVacinas;
