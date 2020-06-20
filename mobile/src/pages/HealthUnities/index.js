import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

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
                <Icon style={{paddingTop: 9}} onPress={() => {navigateToMain()}} name="close" size={30} color="#333" />
                <Image style={styles.logo}
                source={logoImg} />
                <Icon style={{paddingTop: 9}} name="check" size={30} color="#34b7f1" />
            </Header>
            <Content>
                <MapView initialRegion={currentRegion} style={styles.map}>
                    <Marker coordinate={{ latitude: -28.6948485, longitude: -49.3765951}}>

                    </Marker>
                </MapView>
            </Content>
        </Container>
    );
}