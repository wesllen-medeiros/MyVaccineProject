import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import api from "../../../services/index";
import { cnpjMask } from "../../Base/Maks/masks";

function Register() {
  const [nm_fantasia, setNm_fantasia] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [state, setstate] = useState({});
  const [municipio, setMunicio] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function sortOn(arr, prop) {
    arr.sort(function (a, b) {
      if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] > b[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  let selectStates = [];
  let selectCities = [];

  function populateStateSelect() {
    selectStates = document.getElementById("states");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((states) => {
        sortOn(states, "nome");
        states.map((state) => {
          const option = document.createElement("option");

          option.setAttribute("value", state.id);
          option.setAttribute("label", state.nome);
          option.textContent = state.nome;

          selectStates.appendChild(option);

          return selectStates;
        });
      });
  }

  function populateCitySelect() {
    selectCities = document.getElementById("cities");
    selectStates.addEventListener("change", () => {
      let nodesSelectCities = selectCities.childNodes;

      [...nodesSelectCities].map((node) => node.remove());

      let state = selectStates.options[selectStates.selectedIndex].value;

      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`
      )
        .then((res) => res.json())
        .then((cities) => {
          sortOn(cities, "nome");

          selectCities.removeAttribute("disabled");

          cities.map((city) => {
            const option = document.createElement("option");

            option.setAttribute("value", city.nome);
            option.textContent = city.nome;

            selectCities.appendChild(option);

            return selectCities;
          });
        });
    });
  }

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      nm_fantasia,
      email,
      cnpj: cnpj.replace(/[./-]/g, ""),
      state: state.name,
      municipio,
      password,
    };

    console.log(data);

    await api
      .post("estab", data)
      .then(function (data) {
        alert(`Cadastro Eferuado com Sucesso!${data.data.nm_fantasia}`);
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    history.push("/");
  }

  useEffect(() => {
    populateStateSelect();
    populateCitySelect();
  });

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
                      onChange={(e) => setNm_fantasia(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      maxLength="18"
                      placeholder="CNPJ"
                      value={cnpj}
                      onChange={(e) => setCnpj(cnpjMask(e.target.value))}
                      required
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-map"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
                      name="states"
                      id="states"
                      placeholder="Estado"
                      value={state.id}
                      onChange={(e) =>
                        setstate({
                          name: e.target[e.target.selectedIndex].text,
                          id: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Selecione um estado</option>
                    </Input>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-pin"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
                      name="cities"
                      id="cities"
                      disabled
                      placeholder="Município"
                      value={municipio}
                      onChange={(e) => setMunicio(e.target.value)}
                      required
                    >
                      <option value="">Selecione um município</option>
                    </Input>
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
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Row>
                    <Col>
                      <Button type="submit" color="success" block>
                        Salvar
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        block
                        color="primary"
                        onClick={() => history.push("/")}
                      >
                        Voltar
                      </Button>
                    </Col>
                  </Row>
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
