import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

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
    FormInput,
    FormPassword,
    FormSelect
  } from './styles';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [birthday, setBirthday] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    const navigation = useNavigation();

    function navigateToLogin(){
        navigation.navigate('Login');

    }

    async function handleNewProfile(){

        const data = {
            name: name,
            email: email,
            password: password,
            cpf: cpf.replace(/[.-]/g,''),
            sexo: sexo,
            dt_nascimento: Date(birthday),
            state: state,
            municipio: city

        };

        try {
            await api.post('users', data)

            alert('Usuário cadastrado com sucesso!');

            navigateToLogin();
        } catch (err) {
            alert(err.response.data.error);
        }
    }

    return(
        <Container>
            <Header>
                <Title>My Vaccine Logo</Title>
            </Header>
            <FormGroup>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormInput placeholder="Nome Completo" type="text"
                    onChangeText={(inputVal) => setName(inputVal)}></FormInput>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormInput placeholder="E-mail" type="text"
                    onChangeText={(inputVal) => setEmail(inputVal)}></FormInput>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormPassword placeholder="Senha" secureTextEntry={true}
                    onChangeText={(inputVal) => setPassword(inputVal)}></FormPassword>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <TextInputMask keyboardType='numeric'
                    placeholder="CPF"
                    type={'cpf'}
                    value={cpf}
                    onChangeText={text => {
                        setCpf(text)
                      }}
                    style={styles.textInputMask}></TextInputMask>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormSelect placeholder="Sexo"
                    onValueChange={(inputVal) => setSexo(inputVal)}
                    selectedValue={sexo}>
                        <FormSelect.Item label="Feminino" value="F" />
                        <FormSelect.Item label="Masculino" value="M" />                        
                    </FormSelect>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <TextInputMask
                    placeholder="Data de Nascimento"
                    keyboardType='numeric'
                    type={'datetime'}
                    options={{
                        format: 'DD/MM/YYYY'
                    }}
                    value={birthday}
                    onChangeText={(inputVal) => setBirthday(inputVal)}
                    style={styles.textInputMask}></TextInputMask>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormSelect placeholder="Estado"
                    onValueChange={(inputVal) => setState(inputVal)}
                    selectedValue={state}>
                        <FormSelect.Item label="Santa Catarina" value="SC" />
                        <FormSelect.Item label="São Paulo" value="SP" />
                    </FormSelect>
                </Form>
                <Form>
                    <Icon style={{padding:4}} name="face" size={35} color="#FFF" />
                    <FormInput placeholder="Cidade" type="text"
                    onChangeText={(inputVal) => setCity(inputVal)}></FormInput>
                </Form>
                <Buttons>
                    <Button onPress={() => {handleNewProfile()}}>
                        <ButtonText>REGISTRAR</ButtonText>
                    </Button>
                    <Button onPress={() => {navigateToLogin()}}>
                        <ButtonText>VOLTAR</ButtonText>
                    </Button>
                </Buttons> 
            </FormGroup>           
        </Container>
    );
}