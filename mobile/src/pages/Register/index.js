import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import moment from "moment";

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

import api from "../../services/api";

import {
  Container,
  Buttons,
  Button,
  ButtonText,
  Header,
  Title,
  FormGroup,
  Form,
  FormInput,
  FormPassword,
  FormSelect,
} from "./styles";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [birthday, setBirthday] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectStates, setSelectStates] = useState([]);
  const [selectCities, setSelectCities] = useState([]);

  const navigation = useNavigation();

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

  function populateStateSelect(){
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((states) => {
        sortOn(states, "nome");
        setSelectStates( states );
      });
  }

  function populateCitySelect(statel){

    setState(statel);

    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${statel.id}/distritos`
    )
      .then((res) => res.json())
      .then((cities) => {
        sortOn(cities, "nome");

        setSelectCities( cities );
      });
  }

  function navigateToLogin() {
    navigation.navigate("Login");
  }

  async function handleNewProfile() {
    let day = birthday.substring(0, 2);
    let month = birthday.substring(3, 5);
    let year = birthday.substring(6, 10);

    const data = {
      name: name,
      email: email,
      password: password,
      cpf: cpf.replace(/[.-]/g, ""),
      sexo: sexo,
      dt_nascimento: moment(year + "-" + month + "-" + day).toISOString(),
      state: state.sigla,
      municipio: city.nome,
      tipo_sanguineo: "O-",
    };

    await api
      .post("users", data)
      .then(function (result) {
        alert("Usuário cadastrado com sucesso!");

        navigateToLogin();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    populateStateSelect();
  }, []);

  return (
    <Container>
      <Header>
        <Title>My Vaccine Logo</Title>
      </Header>
      <FormGroup>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormInput
            placeholder="Nome Completo"
            type="text"
            autoCapitalize="words"
            onChangeText={(inputVal) => setName(inputVal)}
          ></FormInput>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormInput
            placeholder="E-mail"
            type="text"
            autoCapitalize="none"
            onChangeText={(inputVal) => setEmail(inputVal)}
          ></FormInput>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormPassword
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={(inputVal) => setPassword(inputVal)}
          ></FormPassword>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <TextInputMask
            keyboardType="numeric"
            placeholder="CPF"
            type={"cpf"}
            value={cpf}
            onChangeText={(text) => {
              setCpf(text);
            }}
            style={styles.textInputMask}
          ></TextInputMask>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormSelect
            placeholder="Sexo"
            mode="dropdown"
            onValueChange={(inputVal) => setSexo(inputVal)}
            selectedValue={sexo}
          >
            <FormSelect.Item label="Selecione um sexo" value="N" />
            <FormSelect.Item label="Feminino" value="F" />
            <FormSelect.Item label="Masculino" value="M" />
          </FormSelect>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <TextInputMask
            placeholder="Data de Nascimento"
            keyboardType="numeric"
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={birthday}
            onChangeText={(inputVal) => setBirthday(inputVal)}
            style={styles.textInputMask}
          ></TextInputMask>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormSelect
            id="states"
            placeholder="Estado"
            mode="dropdown"
            onValueChange={(inputVal) => populateCitySelect(inputVal)}
            selectedValue={state}
          >
            {selectStates.map((item) => {
            return (
              <FormSelect.Item
                label={item.nome}
                value={item}
                key={item.nome}
              />
            );
          })}
          </FormSelect>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormSelect
            id="cities"
            placeholder="Cidade"
            mode="dropdown"
            onValueChange={(inputVal) => setCity(inputVal)}
            selectedValue={city}
          >
            {selectCities.map((item) => {
            return (
              <FormSelect.Item
                label={item.nome}
                value={item}
                key={item.nome}
              />
            );
          })}
          </FormSelect>
        </Form>
        <Buttons>
          <Button
            onPress={() => {
              navigateToLogin();
            }}
          >
            <ButtonText>VOLTAR</ButtonText>
          </Button>
          <Button
            onPress={() => {
              handleNewProfile();
            }}
          >
            <ButtonText>REGISTRAR</ButtonText>
          </Button>
        </Buttons>
      </FormGroup>
    </Container>
  );
}
