import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: #34b7f1;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  z-index: 5;
`;

export const View = styled.View``;

export const ViewTest = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 50px 20px 20px 20px;
`;
export default StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  map: {
    flex: 1,
  },
});
