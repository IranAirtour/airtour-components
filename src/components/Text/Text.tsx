import React, { FC } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { ScreenUtils } from '../Helpers/index';
import { Theme, useTheme } from '@react-navigation/native';
import { styles } from './styles';
import { ITextProps } from './interface';

const scaleFontSize = ScreenUtils.scaleFontSize;
const TextComponent: FC<ITextProps> = (props: ITextProps) => {
  const {
    style,
    children = '',
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h5Style,
    h6Style,
    h7Style,
    h8Style,
    ...rest
  } = props;
  const theme: Theme = useTheme();
  return (
    <Text
      style={StyleSheet.flatten([
        styles.font,
        {
          color: theme.colors.text,
        },
        style,
        (h1 || h2 || h3 || h4) && (styles.bold as TextStyle),
        h1 && StyleSheet.flatten([{ fontSize: scaleFontSize(40) }, h1Style]),
        h2 && StyleSheet.flatten([{ fontSize: scaleFontSize(34) }, h2Style]),
        h3 && StyleSheet.flatten([{ fontSize: scaleFontSize(28) }, h3Style]),
        h4 && StyleSheet.flatten([{ fontSize: scaleFontSize(22) }, h4Style]),
        h5 &&
          StyleSheet.flatten([
            { fontSize: ScreenUtils.scaleFontSize(20) },
            h5Style,
          ]),
        h6 &&
          StyleSheet.flatten([
            { fontSize: ScreenUtils.scaleFontSize(18) },
            h6Style,
          ]),
        h7 &&
          StyleSheet.flatten([
            { fontSize: ScreenUtils.scaleFontSize(16) },
            h7Style,
          ]),
        h8 &&
          StyleSheet.flatten([
            { fontSize: ScreenUtils.scaleFontSize(14) },
            h8Style,
          ]),
      ])}
      {...rest}>
      {children ?? ''}
    </Text>
  );
};

TextComponent.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  h7: false,
  h8: false,
  style: {},
  h1Style: {},
  h2Style: {},
  h3Style: {},
  h4Style: {},
  h5Style: {},
  h6Style: {},
  h7Style: {},
  h8Style: {},
};

export default TextComponent;
