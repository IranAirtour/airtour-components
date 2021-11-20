import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { GlobalStyles } from '../globalStyles';
import { Button } from '../Button';
import { FontFamily, ScreenUtils } from '../Helpers';
import { INetworkFailure } from './interface';

const NetworkFailure: FC<INetworkFailure> = (props: INetworkFailure) => {
  const { showError, onHandle } = props;
  if (!showError) {
    return null;
  }
  return (
    <View
      style={StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        GlobalStyles.fullCenter,
        {
          alignItems: 'center',
          backgroundColor: '#fff',
          minHeight: 100,
        },
      ])}>
      <Text
        h2
        style={StyleSheet.flatten([
          GlobalStyles.centerText,
          { color: '#716f6f' },
        ])}>
        Network Failure!
      </Text>
      <Button
        onPress={onHandle}
        type={'clear'}
        title={'Please Try Again.'}
        titleStyle={StyleSheet.flatten([
          {
            color: '#5685cd',
            fontSize: 16,
            fontFamily: FontFamily.Nunito,
          },
        ])}
        containerStyle={{
          paddingVertical: 2,
          borderRadius: 20,
        }}
      />
    </View>
  );
};
export { NetworkFailure };
