import { StyleSheet, Animated } from "react-native";
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

export const CardListSchedule = styled.View`
  background: transparent;
  margin: 0 20px;
  height: 70%;
  max-height: 70%;
`;

export const CardAddSchedule = styled.View`
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 210px;
  max-height: 250px;
`;

export const CardItemAdd = styled.View`
  flex: 1;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.8);
  background-color: rgba(52, 183, 241, 0.9);
  border-radius: 4px;
  padding: 6px;
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

export const LabelInput = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: rgba(0, 128, 128, 0.4);
  align-items: center;
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
`;

export default StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  textInputMask: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0)",
    backgroundColor: "rgba(128, 128, 128, 0.3)",
    color: "#FFF",
    borderRadius: 8,
    alignItems: "center",
    padding: 6,
    minWidth: 100,
  },
});

export const InputSelectVaccine = styled.Picker`
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  min-width: 57%;
`;

export const InputSelectEstab = styled.Picker`
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  min-width: 57%;
`;

export const ItemCard = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItemCardButton = styled.View`
  margin-top: 5px;
`;

export const Card = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  margin-horizontal: 10%;
  height: auto;
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

export const Item = styled.Text`
  font-size: 13px;
  color: #000;
  font-weight: bold;
  padding: 2px 5px;
`;
