import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import api from  '../../../services/index';

function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory() 

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const res = await api.post('Adminsessions', { email, password })

      localStorage.setItem('email', email)
      localStorage.setItem('password', res.data.password)

      history.push('/home')
    } catch (err) {
      alert('Falha no login! Tente novamente')
    }
  }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleLogin}>
                      <h1>Cadastre-se</h1>
                      <p className="text-muted">Crie um novo Cadastro!</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" 
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password"
                         placeholder="Senha"
                         autoComplete="current-password"
                         value={password}
                         onChange={e => setPassword(e.target.value)}
                         />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Entrar</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Esqueceu sua Senha?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>My Vaccine</h2>
                      <p>Aplicação para agentes de saúde</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Registre-se Aqui!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Login;
