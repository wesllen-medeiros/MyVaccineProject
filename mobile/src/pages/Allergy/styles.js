import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #34b7f1;
  justify-content: center;
`;

export const Header = styled.View`
flex-direction: row;
justify-content: space-between;
padding: 50px 20px 20px 20px;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 84%;
  z-index: 5;
`;

export const CardAddAllergy = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 20%;
  max-height: 100px;
`;

export const CardItemAdd = styled.View`
  flex: 1;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(52, 183, 241, 0.9);
  border-radius: 4px;
  padding: 6px;
  min-width: 200px;
  margin: 5px;

  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const CardItemItemAdd = styled.View`
  flex: 2;
  flex-direction: row;
`;

export const CardItemAddText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const InputSelectAllergy = styled.Picker`
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  padding: 6px;
  min-width: 70%;

  font-size: 18px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
    border-radius: 8px;
    background-color: rgba(0, 128, 128, 0.4);
    align-items: center;
    padding: 12px;
    margin: 7px 10px;
    min-width: 80px;
`;

export const ButtonText = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
`;

export const AlergiesList = styled.Text`
  font-size: 18px;
  color: #34b7f1;
  font-weight: bold;
  margin: 7px 10px;
`;

export default StyleSheet.create({
  flatList: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 4,
      marginVertical: 10,
      marginHorizontal: 20
  },
  logo: {
    width: 50,
    height: 50,
  }
});

export const CardTop = styled.View`
  flex: 1;
  background: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin: 0 20px;
  max-height: 35px;
  left: 0;
  right: 0;
  top: 0;
`;