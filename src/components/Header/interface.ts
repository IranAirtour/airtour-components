import {
  ImageSourcePropType,
  ImageStyle,
  StatusBarProps,
  StatusBarStyle,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { IIconObject } from '../Icon';

export type IPlacement = 'left' | 'center' | 'right';
export type IHeaderChildrenProps = {
  placement: IPlacement;
  style: StyleProp<ViewStyle>;
  children: any;
};

interface IHeaderIcon extends IIconObject {
  icon?: string;
  text?: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export type IHeaderSubComponent =
  | React.ReactElement<{}>
  | TextProps
  | IHeaderIcon;

export type IHeaderProps = ViewProps & {
  withShadow?: boolean;
  withSafeArea?: boolean;
  shadowColor?: string;
  ViewComponent?: typeof React.Component;
  linearGradientProps?: Object;
  leftComponent?: IHeaderSubComponent;
  centerComponent?: IHeaderSubComponent;
  rightComponent?: IHeaderSubComponent;
  backgroundColor?: string;
  backgroundImage?: ImageSourcePropType;
  backgroundImageStyle?: ImageStyle;
  placement?: 'left' | 'center' | 'right';
  containerStyle?: StyleProp<ViewStyle>;
  centerContainerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element[];
  /** Accepts all props for StatusBar. */
  statusBarProps?: StatusBarProps;
  /** Sets the color of the status bar text. */
  barStyle?: StatusBarStyle;
};
