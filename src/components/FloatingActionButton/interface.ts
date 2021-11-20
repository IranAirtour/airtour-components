import {StyleProp, TextStyle, ViewStyle, ButtonProps} from 'react-native';
import {Theme} from '@react-navigation/native';

export type IFloatingActionButtonProps = ButtonProps & {
  color?: string;
  size?: 'large' | 'small';
  placement?: 'left' | 'right';
  visible?: boolean;
  upperCase?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  theme?: Theme;
};
