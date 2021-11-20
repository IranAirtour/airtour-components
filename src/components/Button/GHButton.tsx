// import React from 'react';
//
// import {
//   RectButton,
//   TouchableHighlight,
//   TouchableNativeFeedback,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//
// } from 'react-native-gesture-handler';
// import {GHTouchableTypes, ITouchable} from './interface';
// import {Theme, useTheme} from '@react-navigation/native';
// import { RectButtonProps } from "react-native-gesture-handler/src/components/GestureButtons";
//
// const toReactNativeGestureHandlerTouchable = (touchable: string) => {
//   if (touchable === String(GHTouchableTypes.TouchableOpacity)) {
//     return TouchableOpacity;
//   }
//   if (touchable === String(GHTouchableTypes.TouchableWithoutFeedback)) {
//     return TouchableWithoutFeedback;
//   }
//   if (touchable === String(GHTouchableTypes.TouchableHighlight)) {
//     return TouchableHighlight;
//   }
//   if (touchable === String(GHTouchableTypes.TouchableNativeFeedback)) {
//     return TouchableNativeFeedback;
//   }
//   if (touchable === String(GHTouchableTypes.RectButton)) {
//     return RectButton;
//   }
//   return TouchableOpacity;
// };
// type IGHButtons = RectButtonProps |BorderlessButtonProps|
// export const GHTouchable: ITouchable = (props: ITouchable) => {
//   const {type} = props;
//   const theme: Theme = useTheme();
//   const TouchableButton: = React.useMemo(
//     () => toReactNativeGestureHandlerTouchable(String(type)),
//     [type],
//   );
//
//
//   return <TouchableButton></TouchableButton>;
// };
