import React, { useEffect, useState } from 'react';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import { TextInputMask } from 'react-native-masked-text';
import dateFormat from 'dateformat';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

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

  const isFocused = useIsFocused();

  const [ user, setUsers ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ dt_nascimento, setBirthday ] = useState('');
  const [ name , setName ] = useState('');
  const [ photoProfile , setPhotoProfile ] = useState('');
  const [ bloodType , setBloodType ] = useState('');
  const [ applieds , setApplieds ] = useState('');
  const [ notificationsBase , setNotificationsBase ] = useState([]);
  const [ recentNotification , setRecentNotification ] = useState('');
  
  const navigation = useNavigation(); 

  async function getNotificationsBase(userId){

      const responseNotificationAll = await api.get('pushNotifications', {
        params: {
          userId: userId,
        }
      });

      if (responseNotificationAll.data.length > 0){

        for (let index = 0; index < responseNotificationAll.data.length; index++) {

          if (responseNotificationAll.data.length == (index + 1)){
            setRecentNotification(responseNotificationAll.data[index].message)
          }
          
        }
  
        const responseNotification = await api.get('pushNotifications', {
            params: {
            userId: userId,
            status: "PENDENTE"
            }
         });
  
        setNotificationsBase(responseNotification.data);
  
        for (let index = 0; index < responseNotification.data.length; index++) {
  
          if (responseNotification.data.length == (index + 1)){
            setRecentNotification(responseNotification.data[index].message)
          }
          
        }
    
        return responseNotification.data;
      } else {

        return [];

      }
  }

  async function loadNotification(userId){

      let resultPermission = await   
      Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (Constants.isDevice && resultPermission.status === 'granted') {
      }

      let resultNotification = await getNotificationsBase(userId);

      return resultNotification;
  }

  async function sendNotification(notificacaoParaEnviar){

    Notifications.cancelAllScheduledNotificationsAsync();

    if (notificacaoParaEnviar.length > 0){

      for (let index = 0; index < notificacaoParaEnviar.length; index++) {

        const notifyMessage = notificacaoParaEnviar[index].message;
        const notifyTitle = notificacaoParaEnviar[index].title;
        
        if (Platform.OS === 'android'){
          const channelCreated = await Notifications.createChannelAndroidAsync('testAndroid', {
            name: 'myVaccine',
            description: 'myVaccine',
            sound: false,
            vibrate: true,
            priority: 'max'
          });
        }
  
        const responseNotification = await api.put(`pushNotifications`, {
          userId: notificacaoParaEnviar[index].UserNotifications[0].user_id,
          userNotificationId: notificacaoParaEnviar[index].UserNotifications[0].push_notification_id
        });
  
        const localNotification = {
          title: notifyTitle,
          body: notifyMessage, // (string) — body text of the notification.
          sound: true,
          color: '#34b7f1',
          ios: {
            sound: true
          },
          android:
          {
            icon: './src/assets/android_icone.png',
            channelId: 'testAndroid'
          }
        };
  
        // let t = new Date();
        // t.setSeconds(t.getSeconds() + 10);
        // const schedulingOptions = {
        //     time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
        //     repeat: 'minute'
        //   };
  
        await Notifications.scheduleLocalNotificationAsync(localNotification);
  
      } 

    }    
    notificacaoParaEnviar = [];  
  }

  async function loadContent(){

    //Id do usuario da sessão  
    const userId = await SecureStore.getItemAsync('userSession');

    //busca dados do usuario pelo Id
    const response = await api.get(`users/${userId}`);

    //atribui os dados recebidos a uma variavel
    const userData = response.data;

    getApplied(userId).then(data => setApplieds(data));

    let notificacaoParaEnviar = await loadNotification(userId);
    sendNotification(notificacaoParaEnviar);

    return userData;
  } 

  function navigateToProfile(user){
      navigation.navigate('Profile', user);

  }

  function navigateToNotification(){
    console.log('teste');
      navigation.navigate('Notification');

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

  async function setContent(userData){  
    
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
    userData.photo_profile ? setPhotoProfile('data:image/png;base64,' + userData.photo_profile) : null;

  }

  async function getApplied(userId){

    const responseApplied = await api.get(`applicationMobile`, {
      params: {
        userId: userId
      }
    });

    let dataApplied = responseApplied.data;

    const  retornoMap = dataApplied.map((applied) => {
  
      return {
          dt_aplicacao: dateFormat(applied.dt_aplicacao, 'dd/mm/yyyy'),
          name: applied.vaccine.name.toUpperCase()
      }
    });

    if (dataApplied.length > 0){
      return retornoMap[0]
    } else {
      return { dt_aplicacao: "Não houveram aplicações até o momento",
               name: "Não houveram aplicações até o momento" }
    } 
  }

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
    loadContent().then(data => setContent(data)); 
  }, [isFocused]);

  return(
    <Container>
        <Header />
        <Content>
         <Menu translateY={translateY} user={user} />
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
                                source={photoProfile ? {uri: photoProfile} : require('../../assets/photoProfile.png')} />
                </CardItem>
              </Top>
              <Bottom>
                <CardItem>                  
                  <TitleCardItem>Última aplicação</TitleCardItem>
                  <DescriptionCardItem>{applieds.dt_aplicacao}</DescriptionCardItem>
                  <TitleCardItem>Última vacina</TitleCardItem>
                  <DescriptionCardItem>{applieds.name}</DescriptionCardItem>
                </CardItem>
              </Bottom>                
            </CardContent>
            <CardFooter onPress={() => {navigateToNotification()}}>
                <Annotation onPress={() => {navigateToNotification()}}>
                  {recentNotification}
                </Annotation>
            </CardFooter>
            </Card>
         </PanGestureHandler>
        </Content>
        <Tabs translateY={translateY} />
    </Container>
  );
}
