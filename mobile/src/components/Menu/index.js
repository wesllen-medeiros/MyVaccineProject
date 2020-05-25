import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

import QRCode from 'react-native-qrcode';

import {
  Container,
  Code,
  Nav,
  NavItem,
  NavText,
  SignOutButton,
  SignOutButtonText,
} from './styles';

export default function Menu({translateY, user}) {
  const navigation = useNavigation(); 

  function navigateToLogin(){
      navigation.navigate('Login');
  }

  function navigateToProfile(){
    navigation.navigate('Profile', user);
  }

  return (
    <Container
      style={{
        opacity: translateY.interpolate({
          inputRange: [0, 150],
          outputRange: [0, 1],
        }),
      }}>
      <Code>
        <QRCode
          value="https://rocketseat.com.br"
          size={150}
          fgColor="#FFF"
          bgColor="#34b7f1"
        />
      </Code>

      <Nav>
        <NavItem onPress={() => {navigateToProfile()}}>
          <Icon name="person-outline" size={20} color="#FFF" />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" size={20} color="#FFF" />
          <NavText>Configurações do App</NavText>
        </NavItem>
      </Nav>

      <SignOutButton onPress={() => {navigateToLogin()}}>
        <SignOutButtonText>SAIR DO APP</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
}
