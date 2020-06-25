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

export const Logo = styled.Image``;

export const Content = styled.View`
  flex: 1;
  flex-direction: column;
  z-index: 5;
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

export const CardImage = styled.View`
  align-items: center;
  margin: 10px 0;
`;

export const TextInput = styled.TextInput`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(52, 183, 241, 0.9);
  color: #fff;
  border-radius: 4px;
  padding: 6px;
  min-width: 200px;
  margin: 5px;

  font-size: 18px;
  font-weight: bold;
`;

export default StyleSheet.create({
  textInputMask: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(52, 183, 241, 0.9)",
    color: "#FFF",
    borderRadius: 4,
    padding: 6,
    minWidth: 200,
    margin: 5,

    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export const CardItem = styled.View`
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

export const CardItemText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const CardItemItem = styled.View`
  flex: 2;
  flex-direction: row;
`;

export const CardTextInput = styled.TextInput`
  border-radius: 4px;
  padding: 6px;
  min-width: 180px;

  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const InputSelect = styled.Picker`
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(52, 183, 241, 0.9);
  color: #fff;
  border-radius: 4px;
  padding: 6px;
  min-width: 200px;
  margin: 5px;

  font-size: 18px;
  font-weight: bold;
`;

export const InputSelectState = styled.Picker`
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  padding: 6px;
  min-width: 150px;

  font-size: 18px;
  font-weight: bold;
`;
