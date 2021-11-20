import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../globalStyles';
import React from 'react';
import { Text } from '../Text';
import { FontFamily, ScreenUtils } from '../Helpers';
import { Icon } from '../Icon';
import { flatten } from '../../screens/FormBuilder/styles';

export const EmptyResult = () => {
  return (
    <View
      style={StyleSheet.flatten([
        GlobalStyles.flex1,
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
        There is not any Flight
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
