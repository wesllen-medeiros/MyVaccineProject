import { StyleSheet } from "react-native";
import styled from "styled-components/native";

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

export default StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

export const Item = styled.Text`
  font-size: 13px;
  color: #000;
  font-weight: bold;
  padding: 2px 5px;
`;

export const Card = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-horizontal: 10%;
  height: auto;
  width: 80%;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px;
`;

export const CardHeaderItem = styled.Text`
  font-size: 13px;
  color: #000;
  font-weight: bold;
`;
