import React from 'react';
import { useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Buttons,
    Button,
    ButtonText,
    Header,
    Title,
    FormGroup,
    Form,
    FormInput
  } from './styles';


export default function Login() {
    const navigation = useNavigation(); 

    function navigateToMain(){
        navigation.navigate('Main');

    }

    function navigateToRegister(){
        navigation.navigate('Register');

    }

    return(
        <Container>
            <Header>
                <Title>My Vaccine Logo</Title>
            </Header>
            <FormGroup>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormInput placeholder="Usuário" type="text"></FormInput>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="lock" size={35} color="#FFF" />
                    <FormInput placeholder="Senha"></FormInput>
                </Form>
                <Buttons>
                    <Button onPress={() => {}}>
                        <ButtonText>CADASTRAR-SE</ButtonText>
                    </Button>
                    <Button onPress={() => {navigateToMain()}}>
                        <ButtonText>ENTRAR</ButtonText>
                    </Button>
                </Buttons> 
            </FormGroup>           
        </Container>
    );
}