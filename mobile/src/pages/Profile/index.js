import React from 'react';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Avatar } from 'react-native-paper';

import {
    Container,
    Header,
    Title,
    Card,
    CardTop,
    CardImage,
    TextInput,
    Content,
    CardHeader
  } from './styles';


export default function Profile() {
    const navigation = useNavigation(); 

    function navigateToMain(){
        navigation.navigate('Main');

    }

    return(
        <Container>
            <Header>
                <Title>My Vaccine Logo</Title>
            </Header>
            <Content>
                <CardTop>
                    <CardHeader>
                        <Icon onPress={() => {navigateToMain()}} name="close" size={30} color="#333" />
                        <Icon name="check" size={30} color="#333" />
                    </CardHeader>
                </CardTop>
                <Card>
                    <CardImage>
                        <Avatar.Image   size={100}
                                        style={{backgroundColor: "#34b7f1"}} 
                                        source={require('../../assets/708311.jpg')}/>

                        <Icon style={{position: "relative", marginTop: -35, marginLeft: 70}} name="photo" size={40} color="#34b7f1" />
                    </CardImage>
                    <TextInput placeholder={"Nome"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"E-mail"}></TextInput>
                    <TextInput placeholder={"Telefone"}></TextInput>
                    <TextInput placeholder={"Tipo Sanguíneo"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    <TextInput placeholder={"CPF"}></TextInput>
                    
                </Card>
            </Content>
        </Container>
    );
}