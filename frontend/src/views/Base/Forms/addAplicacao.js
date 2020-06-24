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
  Row,
} from 'reactstrap';
import Select from "react-select";
import dateformat from 'dateformat'


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
      reacao: '',
      user_id:'',
      selected_estab: [],
      estabelecimentos: [],
      selected_vaccine: [],
      vaccines: [],
      dose: {
        nm_dose: '1º Dose',
        id: 1
      },
      doses: [{
        nm_dose: '1º Dose',
        id: 1
      },
      {
        nm_dose: '2º Dose',
        id: 2
      },
      {
        nm_dose: '3º Dose',
        id: 3
      },
      {
        nm_dose: '4º Dose',
        id: 4
      }]
    }
  }




  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }



  handleSubmit = async e => {
    e.preventDefault();

    const { nm_agente,dt_aplicacao,dose,reacao,selected_estab, selected_vaccine,user_id } = this.state;
    console.log(this.state);
    console.log(dose);
    console.log(dose.nm_dose);

    await api.post('application', {
      nm_agente,
      dt_aplicacao: dateformat(new Date(dt_aplicacao).setDate(new Date(dt_aplicacao).getDate() + 1)),
      dose: dose.nm_dose,
      reacao,
      estab_id: selected_estab.id,
      vaccine_id: selected_vaccine.id ,
      user_id }).then(
        function(){
        }
      ).catch(
        function(err){
          console.log(err.response.data);
        }
      );

  }

  handleSubmitAgenamento = async e => {
    e.preventDefault();

    const {dose,scheduling_date,selected_estab, selected_vaccine,user_id } = this.state;

    await api.post('schedule', {
      dose: dose.nm_dose,
      scheduling_date: dateformat(new Date(scheduling_date).setDate(new Date(scheduling_date).getDate() + 1)) ,
      estab_id: selected_estab.id,
      vaccine_id: selected_vaccine.id,
      user_id }).then(
        function(){

        }
      ).catch(
        function(err){
          console.log(err.response.data);
        }
      );;

    this.props.history.push('../tables/ListApp');
  }

  async componentDidMount() {
      let retornoEstabs = [];
      let retornoVaccines = [];

      await api.get('estab').then(
        function (data) {
          retornoEstabs = data.data;
        }
      ).catch(
        function(err){
          console.log(err.response.data);
        }
      );

      this.setState({ estabelecimentos: retornoEstabs });

      await api.get('vaccine').then(
        function (data) {
          retornoVaccines = data.data;
        }
      ).catch(
        function(err){
          console.log(err.response.data);
        }
      );

      this.setState({ vaccines: retornoVaccines });
  }


  render() {
    const {
      nm_agente,
      dt_aplicacao,
      dose,
      doses,
      reacao,
      user_id,
      scheduling_date,
      selected_vaccine,
      vaccines,
      selected_estab,
      estabelecimentos
    } = this.state;

    return (
      <div className="animated fadeIn"><br></br>
      <Fragment>
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Cadastro de Aplicação</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <FormGroup>
                  <Label htmlFor="company">Nome Agente</Label>
                  <Input
                    type="text"
                    name="nm_agente"
                    placeholder="Nome Agente de Saúde"
                    onChange={(e) => this.setState({ nm_agente: e.target.value })}
                    value={nm_agente}
                  />
                </FormGroup >
              <FormGroup row className="my-0">

               <Col xs="4">
                <FormGroup>
                  <Label htmlFor="date-input">Data Aplicação</Label>
                    <Input type="date"
                    id="date-input"
                    name="DataAplicaca"
                    placeholder="Data Aplicação"
                    onChange={(e) => this.setState({ dt_aplicacao: e.target.value })}
                   value={dt_aplicacao}
                  />
                </FormGroup>
                </Col>

                  <Col xs="4">
                    <FormGroup>
                    <Label htmlFor="select">Dose</Label>
                      <Select
                        isClearable={true}
                        isSearchable={true}
                        options={doses}
                        value={dose}
                        getOptionLabel={(dosel) => dosel.nm_dose}
                        getOptionValue={(dosel) => dosel.id}
                        onChange={(dosel) =>
                          this.setState({ dose: dosel })
                        }
                        placeholder="Selecione uma dose"
                        />
                    </FormGroup>
                  </Col>

                  <Col xs="4">
                  <Label htmlFor="select">Vacina</Label>
                  <Select
                    isClearable={true}
                    isSearchable={true}
                    options={vaccines}
                    value={selected_vaccine}
                    getOptionLabel={(vaccine) => vaccine.name}
                    getOptionValue={(vaccine) => vaccine.id}
                    onChange={(vaccine) =>
                      this.setState({ selected_vaccine: vaccine })
                    }
                    placeholder="Selecione a vacina"
                    />
                  </Col>

                  <Col xs="4">
                    <FormGroup>
                    <Label htmlFor="select">Estabelecimento</Label>
                    <Select
                            isClearable={true}
                            isSearchable={true}
                            options={estabelecimentos}
                            value={selected_estab}
                            getOptionLabel={(estab) => estab.nm_fantasia}
                            getOptionValue={(estab) => estab.id}
                            onChange={(estab) =>
                              this.setState({ selected_estab: estab })
                            }
                            placeholder="Selecione o estabelecimento"
                            />
                    </FormGroup>
                  </Col>


                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Solicite o Código do Paciente:</Label>
                      <Input  valid id="inputIsValid"
                        type="text"
                        onChange={(e) => this.setState({ user_id: e.target.value })}
                        value={user_id}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Alguma Reação?</Label>
                      <Input
                        type="textarea"
                        name="reacao"
                        placeholder="Caso tenha Reação descreva"
                        onChange={(e) => this.setState({ reacao: e.target.value })}
                        value={reacao}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="5">
                    <Button type="submit" onClick={this.toggleLarge} color="primary" className="mt-4" active tabIndex={-1}>Próximo/Agendamento</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>


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
                            <Select
                              isClearable={true}
                              isSearchable={true}
                              options={doses}
                              value={dose}
                              getOptionLabel={(dosel) => dosel.nm_dose}
                              getOptionValue={(dosel) => dosel.id}
                              onChange={(dosel) =>
                                this.setState({ dose: dosel })
                              }
                              placeholder="Selecione uma dose"
                              />
                            </Col>
                          </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="date-input">Data Próxima Vacina</Label>
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
                              <Select
                              isClearable={true}
                              isSearchable={true}
                              options={vaccines}
                              value={selected_vaccine}
                              getOptionLabel={(vaccine) => vaccine.name}
                              getOptionValue={(vaccine) => vaccine.id}
                              onChange={(vaccine) =>
                                this.setState({ selected_vaccine: vaccine })
                              }
                              placeholder="Selecione a vacina"
                              />
                            </Col>
                          </FormGroup>
                      </Form>
                      <Col md="12">
                         <Button onClick={(e) => this.handleSubmitAgenamento(e)} size="sm" color="success"><i className="fa fa-check-square-o" aria-hidden="true"></i>Finalizar</Button>
                    </Col>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
          </Col>
      </Fragment>
      </div>
    );
  }
};

export default addaplicacao;
