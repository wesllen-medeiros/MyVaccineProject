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


class addVacina extends Component {
  state = {
    descricao: '',
    fornec: '',
    obs: '',
    und_medida: '',
  }

  handleSubmit = async e => {
    e.preventDefault();

    const { descricao, fornec, obs, und_medida } = this.state;

    await api.post('vaccine', { descricao, fornec, obs, und_medida });

    this.props.history.push('../tables/ListVacinas');
    //this.props.history.push('ListVacina')
  }

  render() {
    const {
      descricao,
      fornec,
      obs,
      und_medida,
    } = this.state;

    return (
      <div className="animated fadeIn">
        <Col xs="12" sm="12">
          <Card>
            <CardHeader>
              <strong>Cadastro de Vacinas</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={e => this.handleSubmit(e)}>
                <FormGroup>
                  <Label htmlFor="company">Descrição</Label>
                  <Input
                    type="text"
                    name="descricao"
                    placeholder="Descrição da Vacina"
                    onChange={(e) => this.setState({ descricao: e.target.value })}
                    value={descricao}
                  />
                </FormGroup >
                <FormGroup>
                  <Label htmlFor="vat">Fornecedor</Label>
                  <Input
                    type="text"
                    name="fornec"
                    placeholder="Fornecedor"
                    onChange={(e) => this.setState({ fornec: e.target.value })}
                    value={fornec}
                  />
                </FormGroup>
                <FormGroup row className="my-0">
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="city">Observação</Label>
                      <Input
                        type="text"
                        name="obs"
                        placeholder="Observação"
                        onChange={(e) => this.setState({ obs: e.target.value })}
                        value={obs}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="postal-code">Und. Medida</Label>
                      <Input
                        type="text"
                        name="und_medida"
                        placeholder="Unidade de Medida"
                        onChange={(e) => this.setState({ und_medida: e.target.value })}
                        value={und_medida}
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

export default addVacina;
