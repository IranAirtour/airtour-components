import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {IDividerProps} from './interface';
import {withTheme} from "../Helpers/withTheme";

const Divider: FC<IDividerProps> = props => {
  const {style, theme, ...rest} = props;

  return (
    <View
      style={StyleSheet.flatten([
        {
          backgroundColor: theme?.colors?.border,
          height: StyleSheet.hairlineWidth,
        },
        style,
      ])}
      {...rest}
    />
  );
};

export default withTheme(Divider);
