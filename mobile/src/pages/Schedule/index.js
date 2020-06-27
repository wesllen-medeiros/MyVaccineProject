import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";
import dateFormat from "dateformat";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

import api from "../../services/api";

import styles from "./styles";

import logoImg from "../../assets/icone.png";

import {
  Container,
  Header,
  Content,
  CardListSchedule,
  CardAddSchedule,
  CardItemAdd,
  CardItemItemAdd,
  CardItemAddText,
  Button,
  ButtonText,
  InputSelectVaccine,
  ItemCard,
  ItemCardButton,
  LabelInput,
  Card,
  CardHeader,
  CardHeaderItem,
  Item,
  InputSelectEstab,
  InputSelectDose,
} from "./styles";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [estabs, setEstabs] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [estab, setEstab] = useState([]);
  const [dose, setDose] = useState(null);
  const [scheduleDate, setSchedulingDate] = useState("");

  async function loadContent() {
    setSchedulingDate(dateFormat(new Date(), "dd/mm/yyyy"));
    getVaccines().then((data) => setVaccines(data));
    getEstabs().then((data) => setEstabs(data));

    let responseGetSchedule = [];

    await api
      .get(`schedule`, {
        params: {
          userId: await SecureStore.getItemAsync("userSession"),
        },
      })
      .then(function (result) {
        responseGetSchedule = result.data;
      })
      .catch(function (err) {
        console.log(err);
      });

    const retornoMap = responseGetSchedule.map((schedule) => {
      return {
        id: schedule.id,
        scheduling_date: dateFormat(schedule.scheduling_date, "dd/mm/yyyy"),
        dose: schedule.dose,
        vaccine: {
          id: schedule.vaccine.id,
          name: schedule.vaccine.name.toUpperCase(),
        },
        user: {
          id: schedule.user.id,
          name: schedule.user.name,
        },
        estab: {
          cnpj: schedule.estab.cnpj,
          nm_fantasia: schedule.estab.nm_fantasia,
          municipio: schedule.estab.municipio,
        },
      };
    });

    return retornoMap;
  }

  async function getVaccines() {
    let responseVaccine = [];

    await api
      .get(`vaccine`)
      .then(function (data) {
        responseVaccine = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    return responseVaccine.rows;
  }

  async function getEstabs() {
    let responseEstab = [];

    await api
      .get(`estab`)
      .then(function (data) {
        responseEstab = data.data;
      })
      .catch(function (err) {
        console.log(err.response.data);
      });

    return responseEstab;
  }

  function saveSchedule() {
    Alert.alert("Confirma o agendamento?", "", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => save(),
      },
    ]);
  }

  async function save() {
    console.log(scheduleDate);
    let day = scheduleDate.substring(0, 2);
    let month = scheduleDate.substring(3, 5);
    let year = scheduleDate.substring(6, 10);

    const responseSaveSchedule = await api
      .post("schedule", {
        dose: dose === null ? "1º Dose" : dose,
        scheduling_date: moment(year + "-" + month + "-" + day).toISOString(),
        vaccine_id: vaccine.id,
        user_id: await SecureStore.getItemAsync("userSession"),
        estab_id: estab.id,
      })
      .then(function (data) {
        loadContent().then((data) => setSchedules(data));
      })
      .catch(function (error) {
        Alert.alert(
          "Ops, algo inesperado",
          JSON.stringify(error.response.data.error)
        );
      });
  }

  const navigation = useNavigation();

  function navigateToMain() {
    navigation.navigate("Main");
  }

  useEffect(() => {
    loadContent().then((data) => setSchedules(data));
  }, []);

  return (
    <Container>
      <Header>
        <Icon
          style={{ paddingTop: 9 }}
          onPress={() => {
            navigateToMain();
          }}
          name="close"
          size={30}
          color="#FFF"
        />
        <Image style={styles.logo} source={logoImg} />
        <Icon
          style={{ paddingTop: 9 }}
          name="refresh"
          onPress={() => {}}
          size={30}
          color="#34b7f1"
        />
      </Header>
      <Content>
        <CardListSchedule>
          <FlatList
            data={schedules}
            keyExtractor={(schedule) => String(schedule.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: schedule }) => (
              <Card>
                <CardHeader>
                  <CardHeaderItem>{schedule.vaccine.name}</CardHeaderItem>
                  <CardHeaderItem>{schedule.scheduling_date}</CardHeaderItem>
                </CardHeader>
                <Item>Unidade de Saúde: {schedule.estab.nm_fantasia}</Item>
                <Item>Cidade: {schedule.estab.municipio}</Item>
              </Card>
            )}
          />
        </CardListSchedule>
        <CardAddSchedule>
          <CardItemAdd>
            <CardItemAddText>Agendar vacinação</CardItemAddText>
            <ItemCard>
              <LabelInput>Vacina</LabelInput>
              <LabelInput>Data</LabelInput>
            </ItemCard>
            <ItemCard>
              <InputSelectVaccine
                placeholder="Vacinas"
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setVaccine({ id: itemValue })
                }
                selectedValue={vaccine.id}
              >
                {vaccines.map((item) => {
                  return (
                    <InputSelectVaccine.Item
                      label={item.name}
                      value={item.id}
                      key={item.id}
                    />
                  );
                })}
              </InputSelectVaccine>
              <TextInputMask
                placeholder="Data agendamento"
                keyboardType="numeric"
                type={"datetime"}
                options={{
                  format: "DD/MM/YYYY",
                }}
                value={scheduleDate}
                onChangeText={(inputVal) => setSchedulingDate(inputVal)}
                style={styles.textInputMask}
              ></TextInputMask>
            </ItemCard>
            <ItemCard>
              <LabelInput>Estabelecimento</LabelInput>
              <LabelInput>Doses</LabelInput>
            </ItemCard>
            <ItemCard>
              <InputSelectEstab
                placeholder="Estabelecimentos"
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  setEstab({ id: itemValue })
                }
                selectedValue={estab.id}
              >
                {estabs.map((item) => {
                  return (
                    <InputSelectEstab.Item
                      label={item.nm_fantasia}
                      value={item.id}
                      key={item.id}
                    />
                  );
                })}
              </InputSelectEstab>
              <InputSelectDose
                placeholder="Doses"
                mode="dropdown"
                onValueChange={(itemValue) => setDose(itemValue)}
                selectedValue={dose}
              >
                <InputSelectDose.Item label="1º Dose" value="1º Dose" />
                <InputSelectDose.Item label="2º Dose" value="2º Dose" />
                <InputSelectDose.Item label="3º Dose" value="3º Dose" />
                <InputSelectDose.Item label="4º Dose" value="4º Dose" />
              </InputSelectDose>
            </ItemCard>
            <ItemCardButton>
              <Button
                onPress={() => {
                  saveSchedule();
                }}
              >
                <ButtonText>Adicionar</ButtonText>
              </Button>
            </ItemCardButton>
          </CardItemAdd>
        </CardAddSchedule>
      </Content>
    </Container>
  );
}
