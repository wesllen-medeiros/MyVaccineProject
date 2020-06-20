import React from 'react';
import {Animated, Image} from 'react-native';

import {Container, Top, Title} from './styles';

import styles from './styles';

import logoImg from '../../assets/icone.png'

export default function Header({translateY}) {

  return (
    <Container>
      <Top>
        <Image style={styles.logo}
            source={logoImg} />
      </Top>
    </Container>
  );
}
