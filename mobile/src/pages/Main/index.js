import React from 'react';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'


import { Avatar } from 'react-native-paper';

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
  
  const navigation = useNavigation(); 

  function navigateToProfile(){
      navigation.navigate('Profile');

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
            <CardHeader onPress={() => {navigateToProfile()}}>
              <CardHeaderItem>
                <Title>Portador</Title>
                <Description>Marco Antonio</Description>
              </CardHeaderItem>
            </CardHeader>
            <CardContent onPress={() => {navigateToProfile()}}>
              <Top>
                <CardItem>
                  <TitleCardItem>CPF</TitleCardItem>
                  <DescriptionCardItem>012.345.678-90</DescriptionCardItem>
                  <TitleCardItem>Data de nascimento</TitleCardItem>
                  <DescriptionCardItem>30/01/1988</DescriptionCardItem>
                  <TitleCardItem>Tipo sanguíneo</TitleCardItem>
                  <DescriptionCardItem>O+</DescriptionCardItem>
                </CardItem>
                <CardItem>
                  <Avatar.Image style={{marginRight: 15, backgroundColor: "#34b7f1"}}
                                size={180} 
                                source={require('../../assets/708311.jpg')} />
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
