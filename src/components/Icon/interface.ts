import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableHighlightProps,
  ViewStyle,
} from 'react-native';
import {
  IconButtonProps,
  IconProps as VectorIconProps,
} from 'react-native-vector-icons/Icon';

export type IIconType =
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'feather'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5'
  | string;

export interface IIconObject extends TouchableHighlightProps {
  name?: string;
  color?: string;
  size?: number;
  type?: IIconType;
  style?: StyleProp<TextStyle>;
}

export type IIconNode = boolean | React.ReactElement<{}> | Partial<IIconProps>;

export type IIconProps = IconButtonProps & {
  type?: IIconType;
  name: string;
  Component?: typeof React.Component;
  reverse?: boolean;
  raised?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  iconProps?: VectorIconProps;
  reverseColor?: string;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  solid?: boolean;
  brand?: boolean;
};
