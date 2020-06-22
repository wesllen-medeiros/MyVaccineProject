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
      large: false
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    this.state = {
      aplication: [],
      audience: '',
      min_age: '',
      max_age: '',
      unity_age: '',
      name_vaccine: ''
    }

  }

  toggleLarge(name_vaccine = '') {
    this.setState({
      large: !this.state.large,
      name_vaccine: name_vaccine
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
      name_vaccine,
    } = this.state;

    await api.post('vaccine', { name: name_vaccine, public: [{audience,min_age,max_age,unity_age}] }).then(
      function(data){
        alert(`Público alvo cadastrado com sucesso!`);
      }
    ).catch(
      function(err){
        let erro =  err.response.data.erro_mensagem_publico;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      }
    )

    this.toggleLarge();
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
                             <Button color="success" onClick={()=> this.toggleLarge(post.name)} className="mt-3" active tabIndex={-1}><i className="fa fa-plus" aria-hidden="true"></i></Button>
                             <Button color="primary" className="mt-3" active tabIndex={-1}><i className="fa fa-list-alt" aria-hidden="true"></i></Button>
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
                              <option value="CRIANCA">Criança</option>
                              <option value="ADULTO">Adulto</option>
                              <option value="ADOLESCENTE">Adolescente</option>
                              <option value="IDOSO">Idoso</option>
                              <option value="GESTANTE">Gestante</option>
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
