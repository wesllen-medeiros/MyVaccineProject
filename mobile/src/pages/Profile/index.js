import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask } from 'react-native-masked-text';

import { Avatar } from 'react-native-paper';

import styles from './styles';

import {
    Container,
    Header,
    Title,
    Card,
    CardTop,
    CardImage,
    CardItem,
    CardItemItem,
    CardTextInput,
    TextInput,
    Content,
    CardHeader,
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
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({ image: result.uri });
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

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
                                        source={{uri: ('data:image/png;base64,' + photoProfile)}}/>

                        <Icon onPress={() => {imagePicker()}} style={{position: "relative", marginTop: -35, marginLeft: 70}} name="photo" size={40} color="#34b7f1" />
                    </CardImage>
                    <TextInput 
                    value={name}
                    placeholder={"Nome"}></TextInput>
                    <TextInputMask
                        type={'cpf'}
                        style={styles.textInputMask}
                        value={cpf}
                        onChangeText={text => {
                            setCpf(text)
                            }}
                        style={styles.textInputMask}
                        ></TextInputMask>
                    <TextInput 
                    value={email}
                    placeholder={"E-mail"}></TextInput>
                    <InputSelect placeholder="Tipo Sanguíneo"
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
                            placeholder={"Municipio"}></CardTextInput>
                            <InputSelectState placeholder="Estado"
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