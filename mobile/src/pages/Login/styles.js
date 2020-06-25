import { StyleSheet } from "react-native";
import styled from "styled-components/native";

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

export const FormGroup = styled.View`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  margin: 10px;
`;

export const Form = styled.View`
    flex: 2;
    flex-direction: row;
    max-height: 45px
    margin-bottom: 12px;
    justify-content: space-between;
`;

export const FormInput = styled.TextInput`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(128, 128, 128, 0.5);
  color: #fff;
  border-radius: 8px;
  align-items: center;
  padding: 6px;
  min-width: 250px;
`;

export const Buttons = styled.View`
  flex: 2;
  flex-direction: row;
  max-height: 60px;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: rgba(0, 128, 128, 0.4);
  align-items: center;
  padding: 12px;
  margin: 7px 10px;
  min-width: 170px;
`;

export const ButtonText = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
`;

export default StyleSheet.create({
  logo: {
    width: 270,
    height: 77,
  },
});
