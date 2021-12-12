import React, { memo } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { TouchableOpacity as RNGHTouchableOpacity } from 'react-native-gesture-handler';

export const BottomSheetButton = memo((props: any) => {
  const { children, ...otherProps } = props;
  if (Platform.OS === 'android') {
    return (
      <RNGHTouchableOpacity {...otherProps}>
        {children ?? null}
      </RNGHTouchableOpacity>
    );
  }
  return (
    <TouchableOpacity {...otherProps}>{children ?? null}</TouchableOpacity>
  );
});
