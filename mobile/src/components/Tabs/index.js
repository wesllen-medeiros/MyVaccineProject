import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

import {Container, TabsContainer, TabItem, TabText} from './styles';

export default function Tabs({translateY}) {
  const navigation = useNavigation(); 

  function navigateToAllergy(){
    navigation.navigate('Allergy');
  }

  function navigateToApplied(){
    navigation.navigate('Applied');
  }

  function navigateToHealthUnities(){
    navigation.navigate('HealthUnities');
  }

  return (
    <Container
      style={{
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [0, 380],
              outputRange: [0, 30],
              extrapolate: 'clamp',
            }),
          },
        ],
        opacity: translateY.interpolate({
          inputRange: [0, 380],
          outputRange: [1, 0.3],
          extrapolate: 'clamp',
        }),
      }}>
      <TabsContainer>
        <TabItem>
          <Icon name="event" size={35} color="#FFF" />
          <TabText>Agendar</TabText>
        </TabItem>
        <TabItem>
          <Icon onPress={() => {navigateToApplied()}} name="healing" size={35} color="#FFF" />
          <TabText>Administradas</TabText>
        </TabItem>
        <TabItem>
          <Icon onPress={() => {navigateToAllergy()}} name="report" size={35} color="#FFF" />
          <TabText>Alergias</TabText>
        </TabItem>
        <TabItem>
          <Icon onPress={() => {navigateToHealthUnities()}}  name="layers" size={35} color="#FFF" />
          <TabText>Unidades</TabText>
        </TabItem>
      </TabsContainer>
    </Container>
  );
}
