import {
  ActivityIndicatorProps,
  BackgroundPropType,
  StyleProp,
  TextStyle,
  TouchableNativeFeedbackProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { ITextProps } from '../Text';
import { IIconNode } from '../Icon';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ITextTypography } from '../Text/interface';

export type IButtonProps = TouchableOpacityProps &
  TouchableNativeFeedbackProps &
  ITextTypography & {
    title?: string | React.ReactElement<{}>;
    titleStyle?: StyleProp<TextStyle>;
    titleProps?: ITextProps;
    buttonStyle?: StyleProp<ViewStyle>;
    type?: 'solid' | 'clear' | 'outline';
    loading?: boolean;
    loadingStyle?: StyleProp<ViewStyle>;
    loadingProps?: ActivityIndicatorProps;
    containerStyle?: StyleProp<ViewStyle>;
    icon?: IIconNode;
    iconContainerStyle?: StyleProp<ViewStyle>;
    iconRight?: boolean;
    linearGradientProps?: object;
    TouchableComponent?: typeof React.Component;
    ViewComponent?: typeof React.Component;
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    disabledTitleStyle?: StyleProp<TextStyle>;
    raised?: boolean;
  };

export enum GHTouchableTypes {
  'TouchableOpacity',
  'TouchableHighlight',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'RectButton',
}
export type ITouchable = {
  type: GHTouchableTypes;
  props?: Record<string, unknown>;
  color?: string;
  renderChild: (() => null) | ((color?: string) => JSX.Element);
  text: string;
  background?: (A: typeof TouchableNativeFeedback) => BackgroundPropType;
};
