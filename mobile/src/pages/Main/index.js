import React, { useEffect, useState } from 'react';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { TextInputMask } from 'react-native-masked-text';

import { Avatar } from 'react-native-paper';

import styles from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Tabs from '../../components/Tabs';

import {
    Container,
    Content,
    Card,
    CardHeader,
    CardHeaderItem,
    CardContent,
    CardFooter,
    CardItem,
    TitleCardItem,
    DescriptionCardItem,
    Annotation,
    Title,
    Description,
    Top,
    Bottom
  } from './styles';

export default function Main() {
  const [ user, setUsers ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ dt_nascimento, setBirthday ] = useState('');
  const [ name , setName ] = useState('');
  const [ photoProfile , setPhotoProfile ] = useState('');
  const [ bloodType , setBloodType ] = useState('');

  async function getUser(){

  //Id do usuario da sessão  
  const userId = await SecureStore.getItemAsync('userSession');

  //busca dados do usuario pelo Id
  const response = await api.get(`users/${userId}`);

  //atribui os dados recebidos a uma variavel
  const userData = response.data;

  setUsers(userData);

  //Converte a data para apresentar em tela
  let birthday = new Date(userData.dt_nascimento);

  let day = parseInt(birthday.getDate()) < 10 ? "0" + (birthday.getDate()) : (birthday.getDate())
  let month = parseInt(birthday.getMonth() + 1) < 10 ? "0" + (birthday.getMonth() + 1) : (birthday.getMonth() + 1)
  let year = birthday.getFullYear();

  setBirthday(day+"/"+month+"/"+year);

  let strg = userData.name;
  let Nome = strg.split(' ')[0];// separar str por espaços
  let SegundoNome = strg.split(' ')[1];
  setName(Nome + " " + SegundoNome);

  //Inicia a variavel da photo
  setPhotoProfile('data:image/png;base64,' + userData.photo_profile);
  } 
  
  const navigation = useNavigation(); 

  function navigateToProfile(user){
      navigation.navigate('Profile', user);

  }

  let offset = 0;
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = event.nativeEvent;
      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return(
    <Container>
        <Header />
        <Content>
         <Menu translateY={translateY} />
        <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}>
            <Card
            style={{
                transform: [
                {
                    translateY: translateY.interpolate({
                    inputRange: [-350, 0, 380],
                    outputRange: [-50, 0, 380],
                    extrapolate: 'clamp',
                    }),
                },
                ],
            }}
            >
            <CardHeader onPress={() => {navigateToProfile(user)}}>
              <CardHeaderItem>
                <Title>Portador</Title>
                <Description>{name}</Description>
              </CardHeaderItem>
            </CardHeader>
            <CardContent onPress={() => {navigateToProfile(user)}}>
              <Top>
                <CardItem>
                  <TitleCardItem>CPF</TitleCardItem>
                  <TextInputMask
                  editable = {false}
                  type={'cpf'}
                  style={styles.textInputMask}
                  value={user.cpf}
                  onChangeText={text => {
                      setCpf(text)
                    }}
                  style={styles.textInputMask}
                  ></TextInputMask>
                  <TitleCardItem>Data de nascimento</TitleCardItem>
                  <TextInputMask
                  editable = {false}
                  type={'datetime'}
                  options={{
                    format: 'dd/MM/yyyy'
                  }}
                  style={styles.textInputMask}
                  value={dt_nascimento}
                  onChangeText={(inputVal) => setBirthday(inputVal)}></TextInputMask>
                  <TitleCardItem>Tipo sanguíneo</TitleCardItem>
                  <DescriptionCardItem>{user.tipo_sanguineo}</DescriptionCardItem>
                </CardItem>
                <CardItem>
                  <Avatar.Image style={{marginRight: 15, backgroundColor: "#34b7f1"}}
                                size={180} 
                                source={photoProfile ? {uri: photoProfile} : null} />
                </CardItem>
              </Top>
              <Bottom>
                <CardItem>                  
                  <TitleCardItem>Última aplicação</TitleCardItem>
                  <DescriptionCardItem>20/01/1900</DescriptionCardItem>
                  <TitleCardItem>Última vacina</TitleCardItem>
                  <DescriptionCardItem>Xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</DescriptionCardItem>
                </CardItem>
              </Bottom>                
            </CardContent>
            <CardFooter>
                <Annotation>
                Área para notificação mais recente!
                </Annotation>
            </CardFooter>
            </Card>
         </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
    </Container>
  );
}
