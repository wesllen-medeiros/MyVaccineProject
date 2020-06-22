import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { WebView } from 'react-native-webview';

import styles from './styles';

import logoImg from '../../assets/icone.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Header,
    Content,
    View
  } from './styles';


export default function HealthUnities() {

    const [currentRegion, setCurrentRegion] = useState(null);

    

    const navigation = useNavigation(); 

    function navigateToMain(){
        navigation.navigate('Main');
    }

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }

        }

        loadInitialPosition();
    }, []);

    if (!currentRegion){
        return null;
    }

    return(
        <Container>
            <Header>
                <Icon style={{paddingTop: 9}} onPress={() => {navigateToMain()}} name="close" size={30} color="#FFF" />
                <Image style={styles.logo}
                source={logoImg} />
                <Icon style={{paddingTop: 9}} name="check" size={30} color="#34b7f1" />
            </Header>
            <Content>
            <WebView 
            style={styles.map}
             source={{
                html: `
                <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d11773.407581650588!2d-49.37396772308043!3d-28.682017217933904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sHospitais!5e0!3m2!1spt-BR!2sbr!4v1592090242599!5m2!1spt-BR!2sbr" width="970" height="1800" frameborder="0" style="border:0;" allowfullscreen="true" aria-hidden="false" tabindex="0"></iframe>
                `,
              }}
            />
                {/* <MapView initialRegion={currentRegion} style={styles.map}>
                    <Marker coordinate={{ latitude: -28.6948485, longitude: -49.3765951}}>
                    </Marker>
                </MapView> */}
            </Content>
        </Container>
    );
}