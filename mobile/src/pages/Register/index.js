import React, { useState } from "react";
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

  const navigation = useNavigation();

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
      state: state,
      municipio: city,
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
            placeholder="Estado"
            mode="dropdown"
            onValueChange={(inputVal) => setState(inputVal)}
            selectedValue={state}
          >
            <FormSelect.Item label="Selecione um estado" value="NN" />
            <FormSelect.Item label="Acre" value="AC" />
            <FormSelect.Item label="Alagoas" value="AL" />
            <FormSelect.Item label="Amapá" value="AP" />
            <FormSelect.Item label="Amazonas" value="AM" />
            <FormSelect.Item label="Bahia" value="BA" />
            <FormSelect.Item label="Ceará" value="CE" />
            <FormSelect.Item label="Distrito Federal" value="DF" />
            <FormSelect.Item label="Espírito Santo" value="ES" />
            <FormSelect.Item label="Goiás" value="GO" />
            <FormSelect.Item label="Maranhão" value="MA" />
            <FormSelect.Item label="Mato Grosso" value="MT" />
            <FormSelect.Item label="Mato Grosso do Sul" value="MS" />
            <FormSelect.Item label="Minas Gerais" value="MG" />
            <FormSelect.Item label="Pará" value="PA" />
            <FormSelect.Item label="Paraíba" value="PB" />
            <FormSelect.Item label="Paraná" value="PR" />
            <FormSelect.Item label="Santa Catarina" value="SC" />
            <FormSelect.Item label="São Paulo" value="SP" />
            <FormSelect.Item label="Sergipe" value="SE" />
            <FormSelect.Item label="Tocantins" value="TO" />
          </FormSelect>
        </Form>
        <Form>
          <Icon style={{ padding: 4 }} name="face" size={35} color="#FFF" />
          <FormInput
            placeholder="Cidade"
            type="text"
            onChangeText={(inputVal) => setCity(inputVal)}
          ></FormInput>
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
