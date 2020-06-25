import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import api from "../../services/api";

import styles from "./styles";

import logoImg from "../../assets/icone.png";

import {
  Container,
  Header,
  Content,
  Card,
  CardHeader,
  CardHeaderItem,
  Item,
} from "./styles";

export default function Notification() {
  const navigation = useNavigation();

  const [notification, setNotification] = useState([]);

  function navigateToMain() {
    navigation.navigate("Main");
  }

  async function getNotification() {
    const userId = await SecureStore.getItemAsync("userSession");

    let dataNotification = [];

    //busca Alergias do usuario pelo Id
    await api
      .get(`pushNotifications/`, {
        params: {
          userId: userId,
          orderBy: "DESC",
        },
      })
      .then(function (data) {
        dataNotification = data.data;
      })
      .catch(function (error) {
        console.log(JSON.stringify(error.response.data));
      });

    return dataNotification;
  }

  useEffect(() => {
    getNotification().then((data) => setNotification(data));
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
          size={30}
          color="#34b7f1"
        />
      </Header>
      <Content>
        <FlatList
          data={notification}
          keyExtractor={(notifi) => String(notifi.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: notifi }) => (
            <Card>
              <CardHeader>
                <CardHeaderItem>{notifi.title}</CardHeaderItem>
              </CardHeader>
              <Item>{notifi.message}</Item>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}
