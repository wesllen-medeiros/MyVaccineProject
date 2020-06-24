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
import Select from "react-select";


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
      dose: {
            nm_dose: '1 Dose',
            descricao: 'Uma'
            },
      doses: [{
              nm_dose: '1 Dose',
              descricao: 'Uma'
              },
              {
                nm_dose: '2 Doses',
                descricao: 'Duas'
              },
              {
                nm_dose: '3 Doses',
                descricao: 'Três'
              },
              {
                nm_dose: '4 Doses',
                descricao: 'Quatro'
              }],
    }

  }


  handleSubmit = async e => {
    e.preventDefault();

    const { name,prevention,dose } = this.state;

    await api.post('vaccine', { name,prevention,dose: dose.nm_dose }).then(
      function(data){
        console.log(data);
        alert('Vacina cadastrada com sucesso')
      }
    ).catch(
      function(err){
        let erro =  err.response.data.erro_mensagem_vacina;
        alert(`Algo inesperado aconteceu!\n ${erro}`);
      }
    );

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
      doses
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
                        <Select
                              isClearable={true}
                              isSearchable={true}
                              options={doses}
                              value={dose}
                              getOptionLabel={(dosel) => dosel.descricao}
                              getOptionValue={(dosel) => dosel.nm_dose}
                              onChange={(dosel) =>
                                this.setState({ dose: dosel })
                              }
                              placeholder="Selecione uma dose"
                              />
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
