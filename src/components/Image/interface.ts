import {
  Animated,
  ImageProps as RNImageProps,
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
};

