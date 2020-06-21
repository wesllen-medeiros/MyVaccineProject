import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
  Button,
} from 'reactstrap';


import api from '../../../services/index';


class addVacina extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    this.state = {
      name: '',
      prevention: '',
      dose:'',
    }

  }


  handleSubmit = async e => {
    e.preventDefault();

    const { name,prevention,dose } = this.state;

    await api.post('vaccine', { name,prevention,dose });

    this.props.history.push('../tables/ListVacinas');
    //this.props.history.push('ListVacina')
  }


  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }


  render() {

    const{
      name,
      prevention,
      dose,
    } = this.state;

    return (
      <div className="animated fadeIn">
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Cadastro de Vacinas</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={e => this.handleSubmit(e)}>
                  <FormGroup>
                    <Label htmlFor="company">Nome Vacina</Label>
                    <Input
                      type="text"
                      name="descricao"
                      placeholder="Descrição da Vacina"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      value={name}
                    />
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Prevenção</Label>
                        </Col>
                          <Col xs="12" md="9">
                            <Input type="textarea"
                              id="text-input"
                              name="text-input"
                              onChange={(e) => this.setState({ prevention: e.target.value })}
                              value={prevention}
                          />
                    </Col>
                  </FormGroup>

                  
                  <FormGroup row>
                      <Col md="3">
                         <Label htmlFor="select">Dose</Label>
                      </Col>
                        <Col xs="12" md="9">
                         <Input type="select" name="select" id="select" value={dose} onChange={(e) => this.setState({ dose: e.target.value })}>
                            <option value="UNICA">Unica</option>
                            <option value="1 DOSE">1 Dose</option>
                            <option value="2 DOSE">2 Doses</option>
                            <option value="3 DOSE">3 Doses</option>
                           <option value="4 DOSE">4 Doses</option>
                          </Input>
                          </Col>
                        </FormGroup>
                        <Col  md="3">
                            <Button type="submit" color="success" className="mt-3" active tabIndex={-1}>Salvar</Button>
                        </Col>
                </Form>
      
              </CardBody>
            </Card>
          </Col>
      </div>
    );
  }
};

export default addVacina;