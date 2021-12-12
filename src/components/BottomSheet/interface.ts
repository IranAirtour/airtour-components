import React from 'react';
import { SharedValue } from 'react-native-reanimated';
import { IFileModel } from '../../models/File';
import {StyleProp, TextStyle} from "react-native";

export type IFileBottomSheetProps = {
  snapBottomSheetTo: (to?: number) => void;
  setBottomSheetAnimatedValue: (value: number) => void;
  bottomSheetIsOpen: boolean;
  bottomSheetAnimatedValue: SharedValue<number>;
  onCameraPress?: (file: IFileModel) => void;
  onGalleryPress?: (file: IFileModel) => void;
  renderContent?: () => React.ReactNode;
  maxSnapPoint?: number;
  onCloseBottomSheet?: () => void | null;
  opacity?: number;
};

export type IBottomSheetButtonComponentProps = {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  onPress: () => void;
  showBorderBottomWidth?: boolean;
};
