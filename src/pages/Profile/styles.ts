import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS == 'android' ? 150 : 40}px;
`;

export const BackButton = styled(RectButton)`
  margin-top: 40px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  margin: 24px;
  font-family: 'RobotSlab-Medium';
`;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 78px;
  align-self: center;
`;
export const UserAvatarButton = styled.TouchableHighlight`
  margin-top: 64px;
`;
