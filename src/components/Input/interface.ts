import React from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Theme } from '@react-navigation/native';
import { INullableString } from '../../Interface/IBase';
import { ITextTypography } from '../Text/interface';

export type IInputProps = React.ComponentPropsWithRef<typeof TextInput> &
  Omit<
    ITextTypography,
    'h1' | 'h2' | 'h3' | 'h4' | 'h1Style' | 'h2Style' | 'h3Style' | 'h4Style'
  > & {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    disabledInputStyle?: StyleProp<TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    leftIcon?: any;
    leftIconContainerStyle?: StyleProp<ViewStyle>;
    rightIcon?: any;
    rightIconContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: object | any[];
    InputComponent?: typeof React.Component;
    errorProps?: object;
    errorStyle?: object | any[];
    errorMessage?: string | boolean;
    label?: React.ReactNode;
    labelStyle?: object | any[];
    labelProps?: object;
    renderErrorMessage?: boolean;
    theme?: Theme;
    inputProps?: TextInputProps;
    shouldAutoFocusOnMount?: boolean;
  };
