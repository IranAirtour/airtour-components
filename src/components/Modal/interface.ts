import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

export type IModalAnimationType = 'none' | 'slide' | 'fade';

export interface IModalProps {
  visible: boolean;

  onClose(): void;

  onRequestClose?(): void;

  children: React.FunctionComponent | React.ComponentClass | any;
  opacity?: number;
  animationType?: IModalAnimationType;
  containerStyle?: StyleProp<ViewStyle>;
}
