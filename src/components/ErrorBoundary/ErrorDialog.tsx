import { Text } from '../Text';
import { View } from 'react-native';
import React from 'react';
import { flatten, GlobalStyles } from '../globalStyles';
export const ErrorDialog = (props: { errorMeta: Error | null }) => {
  const { errorMeta } = props;
  return (
    <View
      style={flatten([
        GlobalStyles.height100,
        GlobalStyles.width100,
        GlobalStyles.fullCenter,
      ])}>
      <Text h1>{`${errorMeta?.name ?? 'Error!'}`}</Text>
      <Text>{`${errorMeta?.message ?? ' '}`}</Text>
    </View>
  );
};
