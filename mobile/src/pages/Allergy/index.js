import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/icone.png'

import {
    Container,
    Header,
    Content,
    CardAddAllergy,
    CardItemAdd,
    CardItemItemAdd,
    CardItemAddText,
    InputSelectAllergy,
    Button,
    ButtonText,
    AlergiesList
  } from './styles';


export default function Allergy() {

    const navigation = useNavigation(); 

    const [allergies, setAllergies] = useState([]);
    const [userAllergies, setUserAllergies] = useState([]);
    const [alergia, setAlergia] = useState('');
    const [user, setUser] = useState('');

    async function getAllergy(){ 

    let userIdSession = await SecureStore.getItemAsync('userSession'); 
    
    setUser(userIdSession);

    //busca dados de Alergias para montar a combo
    const responseAllergy = await api.get(`allergy`);

    let dataAllergy = responseAllergy.data;

    return dataAllergy;
    
    }

    function navigateToMain(){
        navigation.navigate('Main');
    }

    async function getUserAllergy(){ 

        let userIdSession = await SecureStore.getItemAsync('userSession'); 
        
        setUser(userIdSession);

        let dataAllergies = '';

        //busca Alergias do usuario pelo Id
        await api.get(`userAllergy/${user}`).then(function(data){
            dataAllergies = data.data;
        }).catch(function(error){
            console.log(JSON.stringify(error.response.data.error))
        });

        return dataAllergies

    }

    async function saveAllergy(){
        //Envia dados para salvar a lista de alergias do usuário
        await api.post(`userAllergy`, {descricao: alergia.descricao, user_id: user})
        .then(function(data){
            Alert.alert("Sucesso", "Alergia adicionada com sucesso!");
            getUserAllergy().then(userAllergy => setUserAllergies(userAllergy));
        }
        ).catch(function(error){
            Alert.alert("Ops, algo inesperado", JSON.stringify(error.response.data.error));
        });
    }

    useEffect(() => {
        getAllergy().then(data => setAllergies(data)); 
    }, []);

    return(
        <Container>
            <Header>
                <Icon style={{paddingTop: 9}} onPress={() => {navigateToMain()}} name="close" size={30} color="#333" />                        
                <Image style={styles.logo}
                source={logoImg} />
                <Icon style={{paddingTop: 9}} name="refresh" onPress={() => {getUserAllergy().then(userAllergy => setUserAllergies(userAllergy))}} size={30} color="#333" />
            </Header>
            <Content>
                <FlatList style={styles.flatList}
                data={userAllergies}
                keyExtractor={allergy => String(allergy.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item: allergy }) => (
                    <AlergiesList>{allergy.allergy.descricao}</AlergiesList>
                )}
                />
                <CardAddAllergy>
                <CardItemAdd>
                    <CardItemAddText>Adicionar Alergias</CardItemAddText>
                        <CardItemItemAdd>
                            <InputSelectAllergy 
                                    placeholder="Alergias"
                                    mode="dropdown"
                                    onValueChange={(itemValue, itemIndex) => setAlergia({descricao: itemValue})}
                                    selectedValue={alergia.descricao}>
                                    { allergies.map((item) =>{
                                        return(
                                        <InputSelectAllergy.Item  label={item.descricao} value={item.descricao} key={item.descricao}/>
                                        ); })
                                    }
                            </InputSelectAllergy>
                            <Button onPress={() => {saveAllergy()}}>
                                <ButtonText>Adicionar</ButtonText>
                            </Button>
                            </CardItemItemAdd>
                        </CardItemAdd>
                </CardAddAllergy>
            </Content>
        </Container>
    );
}