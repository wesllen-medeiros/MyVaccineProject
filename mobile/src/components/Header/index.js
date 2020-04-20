import React from 'react';
import {Animated} from 'react-native';

import {Container, Top, Title} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header({translateY}) {

  return (
    <Container>
      <Top>
        <Title>My Vaccine Logo</Title>
      </Top>
    </Container>
  );
}
