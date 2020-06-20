import { StyleSheet, Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #34b7f1;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  max-height: 450px;
  z-index: 5;
`;

export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
`;

export const CardHeader = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 30px 20px;
`;

export const CardContent = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  padding: 0 0 0 20px;
  justify-content: space-between;
`;

export const CardItem = styled.View`
`;

export const Top = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const Bottom = styled.View`
`;

export const TitleCardItem = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const DescriptionCardItem = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const CardHeaderItem = styled.View`
  max-height: 50px
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const Description = styled.Text`
  font-size: 32px;
  margin-top: 3px
  color: #333;
`;

export const CardFooter = styled.View`
  padding: 30px;
  background: #eee;
  border-radius: 4px;
`;

export const Annotation = styled.Text`
  font-size: 12px;
  color: #333;
`;

export default StyleSheet.create({
  textInputMask: {
    fontSize: 16,
    color: "#333"
  }
});