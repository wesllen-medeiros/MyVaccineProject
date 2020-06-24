import React, {useState}from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {useHistory} from 'react-router-dom';
import api from '../../../services/index';



function Register(){
  const [nm_fantasia, setNm_fantasia] = useState('');
  const [email , setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [state , setstate] = useState('');
  const [municipio , setMunicio] = useState('');
  const [password , setPassword] = useState('');

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    const data = {
      nm_fantasia,
      email,
      cnpj,
      state,
      municipio,
      password
    }

      await api.post('estab', data).then(
        function(data){
          alert(`Cadastro Eferuado com Sucesso!${data.data.nm_fantasia}`)
        }
      ).catch(
        function(err){
          console.log(err.response.data);
        }
      );

      history.push('/')

  }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleRegister}>
                    <h1>Cadastre-se</h1>
                    <p className="text-muted">Crie um novo cadastro</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="text"
                      placeholder="Nome Fantasia"
                      autoComplete="nm_fantasia"
                      value={nm_fantasia}
                      onChange={e => setNm_fantasia(e.target.value)}
                      required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      />
                     </InputGroup>
                     <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="text"
                      placeholder="CNPJ"
                      value={cnpj}
                      onChange={e => setCnpj(e.target.value)}
                      required
                      />
                    </InputGroup>
                     <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="select"
                      name="select"
                      id="select"
                      placeholder="Estado"
                      autoComplete="state"
                      value={state}
                      onChange={e => setstate(e.target.value)}
                      required>
                      <option value="Acre">Acre</option>
                      <option value="Alagoas">Alagoas</option>
                      <option value="Amapá">Amapá</option>
                      <option value="Amazonas">Amazonas</option>
                      <option value="Bahia">Bahia</option>
                      <option value="Ceará">Ceará</option>
                      <option value="Distrito Federal">Distrito Federal</option>
                      <option value="Espírito Santo">Espírito Santo</option>
                      <option value="Goiás">Goiás</option>
                      <option value="Maranhão">Maranhão</option>
                      <option value="Mato Grosso">Mato Grosso</option>
                      <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                      <option value="Minas Gerais">Minas Gerais</option>
                      <option value="Pará">Pará</option>
                      <option value="Paraíba">Paraíba</option>
                      <option value="Paraná">Paraná</option>
                      <option value="Santa Catarina">Santa Catarina</option>
                      <option value="São Paulo">São Paulo</option>
                      <option value="Sergipe">Sergipe</option>
                      <option value="Tocantins">Tocantins</option>
                      </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="text"
                      placeholder="Municipio"
                      autoComplete="municipio"
                      value={municipio}
                      onChange={e => setMunicio(e.target.value)}
                      required
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                      type="password"
                      placeholder="Senha"
                      autoComplete="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                     />
                    </InputGroup>
                    <Button color="success" block>Salvar</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

export default Register;
