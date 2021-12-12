import {
  ImageProps as RNImageProps,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

export type IImageProps = RNImageProps & {
  Component?: typeof React.Component;
  onPress?(): void;
  onLongPress?(): void;
  ImageComponent?: React.ComponentType<any>;
  containerStyle?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<ViewStyle>;
  transition?: boolean;
  transitionDuration?: number;
  childrenContainerStyle?: StyleProp<ViewStyle>;
  PlaceholderContent?: any;
  children?: any;
  source: { uri: string } | any;
  style: StyleProp<ImageStyle> & { priority?: string };
};
