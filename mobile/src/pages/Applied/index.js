import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import dateFormat from "dateformat";

import api from "../../services/api";

import styles from "./styles";

import logoImg from "../../assets/icone.png";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  Container,
  Header,
  Content,
  Card,
  CardHeader,
  CardHeaderItem,
  Item,
} from "./styles";

export default function Applied() {
  const navigation = useNavigation();

  const [applieds, setApplieds] = useState([]);
  const [user, setUser] = useState("");
  const [appliedDate, setAppliedDate] = useState("");

  async function getApplied() {
    let userIdSession = await SecureStore.getItemAsync("userSession");

    setUser(userIdSession);

    const responseApplied = await api.get(`applicationMobile`, {
      params: {
        userId: userIdSession,
      },
    });

    let dataApplied = responseApplied.data;

    const retornoMap = dataApplied.map((applied) => {
      return {
        id: applied.id,
        nm_agente: applied.nm_agente,
        dt_aplicacao: dateFormat(applied.dt_aplicacao, "dd/mm/yyyy"),
        dose: applied.dose,
        reacao: applied.reacao,
        vaccine: {
          id: applied.vaccine.id,
          name: applied.vaccine.name.toUpperCase(),
        },
        user: {
          id: applied.user.id,
          name: applied.user.name,
        },
        estab: {
          id: applied.estab.id,
          nm_fantasia: applied.estab.nm_fantasia,
          state: applied.estab.state,
          municipio: applied.estab.municipio,
        },
      };
    });

    return retornoMap;
  }

  function navigateToMain() {
    navigation.navigate("Main");
  }

  useEffect(() => {
    getApplied().then((data) => setApplieds(data));
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
          name="check"
          size={30}
          color="#34b7f1"
        />
      </Header>
      <Content>
        <FlatList
          data={applieds}
          keyExtractor={(applied) => String(applied.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: applied }) => (
            <Card>
              <CardHeader>
                <CardHeaderItem>{applied.vaccine.name}</CardHeaderItem>
                <CardHeaderItem>{applied.dt_aplicacao}</CardHeaderItem>
              </CardHeader>
              <Item>Dose: {applied.dose}</Item>
              <Item>Agente de Saúde: {applied.nm_agente}</Item>
              <Item>Reação Alérgica: {applied.reacao}</Item>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
