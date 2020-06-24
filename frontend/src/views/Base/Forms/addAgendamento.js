import React, { Component,Fragment } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  CardFooter,
  Row,
} from 'reactstrap';


import api from '../../../services/index';


class addaplicacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    this.state = {
      nm_agente: '',
      dt_aplicacao: '',
      dose:'',
      reacao: '',
      vaccine_id:'',
      estab_id:'',
      user_id:''
    }

    this.stateAgendamento = {
      doses:'',
      scheduling_date: '',
      user_id:'',
      vaccine_id:'',
    }

  }




  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }


  handleSubmitAgenamento = async e => {
    e.preventDefault();

    const {doses,scheduling_date,vaccine_id,user_id } = this.state;

    await api.post('schedule', { doses,scheduling_date,vaccine_id,user_id });

    //this.props.history.push('../tables/ListApp');
    //this.props.history.push('ListVacina'
  }


  render() {

    const {
      doses,
      scheduling_date,
      vaccine_id,
    }= this.state;


    return (
      <div className="animated fadeIn">
      <Col xs="12" sm="4">
      <Modal isOpen={this.state.large} toggle={this.toggleLarge}
          className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.toggleLarge}>Agendamento Próxima Vacina</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs="12" sm="12">
                <Card>
                  <CardBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="select">Dose</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="select" name="select" id="select" value={doses} onChange={(e) => this.setState({ doses: e.target.value })}>
                              <option value="1º Dose">1º Dose</option>
                              <option value="2º Dose">2º Dose</option>
                              <option value="3º Dose">3º Dose</option>
                              <option value="4º Dose">4º Dose</option>
                            </Input>
                          </Col>
                        </FormGroup>

                      <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="date-input">Data Agendamento</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="date"
                            id="date-input"
                            name="date-input"
                            placeholder="date"
                            onChange={(e) => this.setState({ scheduling_date: e.target.value })}
                            value={scheduling_date}
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Col md="3">
                            <Label htmlFor="select">Vacina</Label>
                          </Col>
                          <Col xs="12" md="9">
                            <Input type="select" name="select" id="select" value={vaccine_id} onChange={(e) => this.setState({ vaccine_id: e.target.value })}>
                            <option value="3">poliomielite</option>
                              <option value="4">poliomielite</option>
                              <option value="5">poliomielite</option>
                              <option value="6">poliomielite</option>
                              <option value="7">poliomielite</option>
                            </Input>
                          </Col>
                        </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                      <Button onClick={(e) => this.handleSubmitAgenamento(e)} size="sm" color="primary"><i className="fa fa-dot-circle-o"></i>OK</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        </Col>
     </div>
    );
  }
};

export default addaplicacao;
