import React, { Component } from 'react';
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
} from 'reactstrap';


import api from '../../../services/index';


class addaplicacao extends Component {
  state = {
    nm_agente: '',
    dt_aplicacao: '',
    dose:'',
    reacao: '',
    vaccine_id:'',
    estab_id:'',
    user_id:''
  }

  

  handleSubmit = async e => {
    e.preventDefault();

    const { nm_agente,dt_aplicacao,dose,reacao,vaccine_id,estab_id,user_id } = this.state;

    await api.post('application', { nm_agente,dt_aplicacao,dose,reacao,vaccine_id,estab_id,user_id });

    this.props.history.push('../tables/ListApp');
    //this.props.history.push('ListVacina')
  }

  render() {
    const {
      nm_agente,
      dt_aplicacao,
      dose,
      reacao,
      vaccine_id,
      estab_id,
      user_id,
    } = this.state;

    return (
      <div className="animated fadeIn">
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
                <FormGroup>
                  <Label htmlFor="vat">Data aplicação</Label>
                  <Input
                    type="text"
                    name="dt_aplicacao"
                    placeholder="Data da Aplicação"
                    onChange={(e) => this.setState({ dt_aplicacao: e.target.value })}
                    value={dt_aplicacao}
                  />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="city">Dose</Label>
                      <Input
                        type="text"
                        name="dose"
                        placeholder="Dose"
                        onChange={(e) => this.setState({ dose: e.target.value })}
                        value={dose}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Alguma Reação?</Label>
                      <Input
                        type="text"
                        name="reacao"
                        placeholder="Caso tenha Reação descreva"
                        onChange={(e) => this.setState({ reacao: e.target.value })}
                        value={reacao}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Selecione a Vacina</Label>
                      <Input
                        type="text"
                        name="vaccine_id"
                        placeholder="Selecione a Vacina"
                        onChange={(e) => this.setState({ vaccine_id: e.target.value })}
                        value={vaccine_id}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Selecione o Estabeleciomento</Label>
                      <Input
                        type="text"
                        name="estab_id"
                        placeholder="Selecione o Estabeleciomento"
                        onChange={(e) => this.setState({ estab_id: e.target.value })}
                        value={estab_id}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Selecione um Usuário</Label>
                      <Input
                        type="text"
                        name="user_id"
                        placeholder="Selecione um Usuário"
                        onChange={(e) => this.setState({ user_id: e.target.value })}
                        value={user_id}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="5">
                    <Button type="submit" color="primary" className="mt-4" active tabIndex={-1}>Salvar</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
};

export default addaplicacao;
