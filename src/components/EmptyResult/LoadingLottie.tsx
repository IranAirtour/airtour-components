import { StyleSheet, View } from 'react-native';
import { flatten, GlobalStyles } from '../globalStyles';
import React from 'react';
import { Text } from '../Text';
import { FontFamily, ScreenUtils } from '../Helpers';
import { Icon } from '../Icon';
import withTheme from '../Theme/withTheme';

const EmptyResultBase = () => {
  return (
    <View
      style={StyleSheet.flatten([
        // GlobalStyles.flex1,
        GlobalStyles.fullCenter,
        GlobalStyles.centerSelf,
        { height: ScreenUtils.h(50), padding: 30 },
      ])}>
      <Text
        style={flatten([
          GlobalStyles.centerText,
          {
            fontFamily: FontFamily.NunitoBold,
            fontSize: ScreenUtils.scaleFontSize(25),
            color: '#8f8f8f',
          },
        ])}>
        There is not any result for this search
      </Text>
      <Icon
        name={'calendar-search'}
        type={'material-community'}
        size={28}
        color={'gray'}
        containerStyle={{ marginTop: 16 }}
      />
    </View>
  );
};
export const EmptyResult = withTheme(EmptyResultBase, 'EmptyResultBase');
