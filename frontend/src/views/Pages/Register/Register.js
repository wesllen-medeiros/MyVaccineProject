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

    try {

      const res = await api.post('estab', data)
      alert(`Cadastro Eferuado com Sucesso!${res.data.nm_fantasia}`)
      history.push('/')

    } catch (err) {
      alert('Erro no cadastro! Tente novamente.')
    }

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
                      type="text"
                      placeholder="Estado"
                      autoComplete="state"
                      value={state}
                      onChange={e => setstate(e.target.value)}
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
