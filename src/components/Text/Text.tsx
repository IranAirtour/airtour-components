import React, { FC } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { ScreenUtils } from '../Helpers/index';
import { styles } from './styles';
import { ITextProps } from './interface';
import { flatten } from '../globalStyles';
import { useThemeColors } from '../Theme/ThemeProvider';

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
    h9,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h5Style,
    h6Style,
    h7Style,
    h8Style,
    h9Style,
    ...rest
  }: ITextProps = props;
  const themeColor = useThemeColors();
  return (
    <Text
      style={flatten([
        styles.font,
        {
          color: themeColor?.textDark ?? 'grey',
        },
        style,
        (h1 || h2 || h3 || h4) && (styles.bold as TextStyle),
        h1 && flatten([{ fontSize: ScreenUtils.scaleFontSize(40) }, h1Style]),
        h2 && flatten([{ fontSize: ScreenUtils.scaleFontSize(34) }, h2Style]),
        h3 && flatten([{ fontSize: ScreenUtils.scaleFontSize(28) }, h3Style]),
        h4 && flatten([{ fontSize: ScreenUtils.scaleFontSize(22) }, h4Style]),
        h5 && flatten([{ fontSize: ScreenUtils.scaleFontSize(20) }, h5Style]),
        h6 && flatten([{ fontSize: ScreenUtils.scaleFontSize(18) }, h6Style]),
        h7 && flatten([{ fontSize: ScreenUtils.scaleFontSize(16) }, h7Style]),
        h8 && flatten([{ fontSize: ScreenUtils.scaleFontSize(14) }, h8Style]),
        h9 && flatten([{ fontSize: ScreenUtils.scaleFontSize(10) }, h9Style]),
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
  h9: false,
  style: {},
  h1Style: {},
  h2Style: {},
  h3Style: {},
  h4Style: {},
  h5Style: {},
  h6Style: {},
  h7Style: {},
  h8Style: {},
  h9Style: {},
};

export default TextComponent;
