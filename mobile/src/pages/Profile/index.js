import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';

import {Image} from 'react-native';

import { Avatar } from 'react-native-paper';

import styles from './styles';

import logoImg from '../../assets/icone.png'

import api from '../../services/api';

import {
    Container,
    Header,
    Card,
    CardImage,
    CardItem,
    CardItemItem,
    CardTextInput,
    TextInput,
    Content,
    CardItemText,
    InputSelect,
    InputSelectState
  } from './styles';


export default function Profile(user) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [sexo, setSexo] = useState('');
    const [birthday, setBirthday] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');    
    const [photoProfile, setPhotoProfile] = useState('');
    const [bloodType, setBloodType] = useState('');    
    const [passwordHash, setPasswordHash] = useState('');
    const [id, setId] = useState('');

    const navigation = useNavigation();     

    function getUser(){
        //Carga inicial dos dados
        setName(user.route.params.name);
        setEmail(user.route.params.email);
        setCpf(user.route.params.cpf);
        setSexo(user.route.params.sexo);
        setState(user.route.params.state);
        setCity(user.route.params.municipio);
        setBloodType(user.route.params.tipo_sanguineo);        
        setPhotoProfile(user.route.params.photo_profile);        
        setPasswordHash(user.route.params.password_hash);       
        setId(user.route.params.id);

        //conversão e carga data nascimento
        let dt_temp = user.route.params.dt_nascimento;

        let dt_nasc = new Date(dt_temp);

        let day = parseInt(dt_nasc.getDate()) < 10 ? "0" + (dt_nasc.getDate()) : (dt_nasc.getDate())
        let month = parseInt(dt_nasc.getMonth() + 1) < 10 ? "0" + (dt_nasc.getMonth() + 1) : (dt_nasc.getMonth() + 1)
        let year = dt_nasc.getFullYear();

        setBirthday(day+"/"+month+"/"+year);
    }

    function navigateToMain(){
        navigation.navigate('Main');

    }

    async function imagePicker() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true
            });
            if (!result.cancelled) {
                setPhotoProfile(result.base64);
            }    
        } catch (e) {
            console.log(e);
        }
    }

    async function saveChangesProfile(){

        //converte data para enviar ao backend
        var dateParts = birthday.split("/");

        var dtNascimento = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString();

        const data = {
            id: id,
            name: name,
            email: email,
            cpf: cpf,
            sexo: sexo,
            dt_nascimento: dtNascimento.toString(),
            state: state,
            municipio: city,
            password_hash: passwordHash,
            photo_profile: photoProfile,
            tipo_sanguineo: bloodType
        };

        try {   
            const response = await api.put('users', data);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return(
        <Container>
            <Header>
                <Icon style={{paddingTop: 9}} onPress={() => {navigateToMain()}} name="close" size={30} color="#333" />
                <Image style={styles.logo}
                source={logoImg} />
                <Icon style={{paddingTop: 9}} name="check" onPress={() => {saveChangesProfile()}} size={30} color="#333" />
            </Header>
            <Content>
                <Card>
                    <CardImage>
                        <Avatar.Image   size={100}
                                        style={{backgroundColor: "#34b7f1"}} 
                                        source={{uri: ('data:image/png;base64,' + photoProfile)}}/>

                        <Icon onPress={() => {imagePicker()}} style={{position: "relative", marginTop: -35, marginLeft: 70}} name="photo" size={40} color="#34b7f1" />
                    </CardImage>
                    <TextInput 
                    value={name}
                    placeholder={"Nome"}
                    onChangeText={text => {
                        setName(text)
                        }}></TextInput>
                    <TextInputMask
                        editable = {false}
                        type={'cpf'}
                        style={styles.textInputMask}
                        value={cpf}
                        onChangeText={text => {
                            setCpf(text)
                            }}
                        style={styles.textInputMask}
                        ></TextInputMask>
                    <TextInput 
                    editable = {false}
                    value={email}
                    placeholder={"E-mail"}
                    onChangeText={text => {
                        setEmail(text)
                        }}></TextInput>
                    <InputSelect placeholder="Tipo Sanguíneo"
                    mode="dropdown"
                    onValueChange={(inputVal) => setBloodType(inputVal)}
                    selectedValue={bloodType}>
                        <InputSelect.Item label="O-" value="O-" />
                        <InputSelect.Item label="O+" value="O+" />
                        <InputSelect.Item label="A-" value="A-" />
                        <InputSelect.Item label="A+" value="A+" />
                        <InputSelect.Item label="B-" value="B-" />
                        <InputSelect.Item label="B+" value="B+" />
                        <InputSelect.Item label="AB-" value="AB-" />
                        <InputSelect.Item label="AB+" value="AB+" />
                    </InputSelect>
                    <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'dd/MM/yyyy'
                    }}
                    style={styles.textInputMask}
                    value={birthday}
                    onChangeText={(inputVal) => setBirthday(inputVal)}></TextInputMask>
                    <InputSelect placeholder="Sexo"
                    mode="dropdown"
                    onValueChange={(inputVal) => setSexo(inputVal)}
                    selectedValue={sexo}>
                        <InputSelect.Item label="Feminino" value="F" />
                        <InputSelect.Item label="Masculino" value="M" />                        
                    </InputSelect>
                    <CardItem>
                        <CardItemText>Endereço (Cidade | Estado)</CardItemText>
                        <CardItemItem>
                            <CardTextInput 
                            value={city}
                            placeholder={"Municipio"}
                            onChangeText={text => {
                                setCity(text)
                                }}></CardTextInput>
                            <InputSelectState placeholder="Estado"
                                mode="dropdown"
                                onValueChange={(inputVal) => setState(inputVal)}
                                selectedValue={state}>
                                <InputSelectState.Item label="Santa Catarina" value="SC" />
                                <InputSelectState.Item label="São Paulo" value="SP" />
                            </InputSelectState>
                        </CardItemItem>
                    </CardItem>                    
                </Card>
            </Content>
        </Container>
    );
}