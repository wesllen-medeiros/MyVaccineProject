import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Form,
  CardHeader,
} from 'reactstrap';

import Select from "react-select";

import api from '../../../services/index';



class addCampanha extends Component {

  state = {
    descricao: '',
    dt_ini: '', 
    dt_fim:'',   
    state: '', 
    municipio:'', 
    audience: '',
    min_age: '',
    max_age: '',
    unity_age: '',
    dose: '',
    selected_estab: '',
    estabelecimentos: [], 
    selected_vaccine:'',
    vaccines: [],
  }


  
handleSubmit = async e => {
  e.preventDefault();

  const {  descricao,dt_ini,dt_fim,state,municipio,audience,min_age,max_age,unity_age,dose,selected_estab, selected_vaccine } = this.state;

  await api.post('campaign', {descricao,dt_ini,dt_fim,state,municipio,audience,min_age,max_age,unity_age,dose,estab_id: selected_estab.id, vaccine_id: selected_vaccine.id });

  this.props.history.push('../cards/CardCampanha');
  //this.props.history.push('ListVacina')
}

async componentDidMount() {
  try {
    const resEstabs = await api.get('estab');

    this.setState({ estabelecimentos: resEstabs.data });

    const resVaccines = await api.get('vaccine');

    this.setState({ vaccines: resVaccines.data });
  } catch (err) {
    console.log(err);
  }
}



  render() {

    const {  descricao,dt_ini,dt_fim,state,municipio,audience,min_age,max_age,unity_age,dose, selected_estab, estabelecimentos, selected_vaccine, vaccines} = this.state;

    return (
      <div className="animated fadeIn">
                  <Col xs="12" sm="8"  >
                    <Card>
                    <CardHeader>
                      <strong>Cadastro de Campanhas</strong>
                    </CardHeader>
                      <CardBody>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Descrição</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text"
                               id="text-input"
                               name="text-input"
                               placeholder="Descrição da Campanha"
                               onChange={(e) => this.setState({ descricao: e.target.value })}
                               value={descricao}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="date-input">Inicio</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="date" 
                              id="date-input"
                              name="date-input"
                              placeholder="date"
                              onChange={(e) => this.setState({ dt_ini: e.target.value })}
                              value={dt_ini}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="date-input">Fim</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="date"
                               id="date-input"
                               name="date-input"
                               placeholder="date"
                               onChange={(e) => this.setState({ dt_fim: e.target.value })}
                               value={dt_fim}
                               />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Estado</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text" 
                              id="text-input"
                              name="text-input"
                              onChange={(e) => this.setState({ state: e.target.value })}
                              value={state}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Municipio</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text"
                               id="text-input" 
                               name="text-input"
                               onChange={(e) => this.setState({ municipio: e.target.value })}
                               value={municipio}
                               />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Alvos</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="select" name="select" id="select" value={audience} onChange={(e) => this.setState({ audience: e.target.value })}>
                              <option value="CRIANCA">CRIANÇA</option>
                                <option value="ADULTO">ADULTO</option>
                                <option value="ADOLECENTE">ADOLECENTE</option>
                                <option value="GESTANTE">GESTANTE</option>
                                <option value="GESTANTE">IDOSO</option>
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
                              onChange={(e) => this.setState({ max_age: e.target.value })}
                              value={max_age}
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
                              onChange={(e) => this.setState({ min_age: e.target.value })}
                              value={min_age}
                              />
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Tipo</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="select" name="select" id="select" value={unity_age} onChange={(e) => this.setState({ unity_age: e.target.value })}>
                                <option value="MESES">Meses</option>
                                <option value="ANOS">Anos</option>
                                <option value="AO_NASCER">Ao Nascer</option>
                              </Input>
                            </Col>
                          </FormGroup>
              
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="select">Dose</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="select" name="select" id="select" value={dose} onChange={(e) => this.setState({ dose: e.target.value })}>
                                <option value="UNICA">Unica</option>
                                <option value="1 Dose">Uma</option>
                                <option value="2 Dose">Duas</option>
                                <option value="3 Dose">Três</option>
                                <option value="4 Dose">Quatro</option>
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Estabelecimento</Label>
                            </Col>
                            <Col xs="12" md="9">
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
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Vacina</Label>
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

                          <Col xs="5">
                              <Button type="submit" color="primary" className="mt-4" active tabIndex={-1}>Salvar</Button>
                          </Col>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
      </div>
    );
  }
};

export default addCampanha;
