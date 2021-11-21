import {
  StyleProp,
  TextProps as TextProperties,
  TextStyle,
} from 'react-native';
import { ReactNode } from 'react';

export interface ITextProps extends TextProperties, ITextTypography {
  style?: StyleProp<TextStyle>;
  children?: ReactNode | any;
}

export type ITextTypography = {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  h7?: boolean;
  h8?: boolean;
  h9?: boolean;
  h1Style?: StyleProp<TextStyle>;
  h2Style?: StyleProp<TextStyle>;
  h3Style?: StyleProp<TextStyle>;
  h4Style?: StyleProp<TextStyle>;
  h5Style?: StyleProp<TextStyle>;
  h6Style?: StyleProp<TextStyle>;
  h7Style?: StyleProp<TextStyle>;
  h8Style?: StyleProp<TextStyle>;
  h9Style?: StyleProp<TextStyle>;
};
