import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); 

    async function navigateToMain(){
        const data = {
            email: email,
            password: password
        };

        try {
            const response = await api.post('usersessions', data);

            await SecureStore.setItemAsync('userSession',JSON.stringify(response.data.user.id));

            navigation.navigate('Main');
        } catch (err) {
            alert(err.response.data.error);
        }
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
                    <FormInput placeholder="E-mail" type="text"
                    onChangeText={(inputVal) => setEmail(inputVal)}></FormInput>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="lock" size={35} color="#FFF" />
                    <FormInput placeholder="Senha" secureTextEntry={true}
                    onChangeText={(inputVal) => setPassword(inputVal)}></FormInput>
                </Form>
                <Buttons>
                    <Button onPress={() => {navigateToRegister()}}>
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