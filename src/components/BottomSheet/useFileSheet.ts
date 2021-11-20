import React, { useCallback, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

export const useFileSheet = () => {
  const fileSheetRef = React.useRef(null);
  const fileBottomSheetAnimatedValue = useSharedValue(0);
  const [fileBottomSheetIsOpen, setFileBottomSheetIsOpen] =
    useState<boolean>(false);

  const setFileBottomSheetAnimatedValue = useCallback(
    (toValue: number = 0) => {
      fileBottomSheetAnimatedValue.value = toValue;
      setFileBottomSheetIsOpen(Boolean(toValue));
    },
    [fileBottomSheetAnimatedValue],
  );
  const snapFileBottomSheetTo = useCallback(
    (to: number = 1) => {
      fileSheetRef.current?.snapTo(to);
    },
    [fileSheetRef],
  );
  const useFileSheetProvider = () => {
    return {
      fileSheetRef,
      fileBottomSheetIsOpen,
      setFileBottomSheetAnimatedValue,
      snapFileBottomSheetTo,
      fileBottomSheetAnimatedValue,
    };
  };

  return useFileSheetProvider();
};
