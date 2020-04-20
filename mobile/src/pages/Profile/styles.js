import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #34b7f1;
  justify-content: center;
`;

export const Header = styled.View`
  align-items: center;
  padding: 40px 0 30px;
`;

export const Logo = styled.Image``;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  margin-left: 8px;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  z-index: 5;
`;

export const CardTop = styled.View`
  flex: 1;
  background: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 0 20px;
  max-height: 30px;
  left: 0;
  right: 0;
  top: 0;
`;

export const Card = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`  
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin: -1px 20px;
  max-height: 93%;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const CardImage = styled.View`
  align-items: center;
  margin: 10px 0;
`;

export const TextInput = styled.TextInput`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(52, 183, 241, 0.9);
  color: #FFF;
  border-radius: 4px;
  padding: 6px;
  min-width: 200px;
  margin: 5px;

  font-size: 18px;
  color: #333;
  font-weight: bold;
`;