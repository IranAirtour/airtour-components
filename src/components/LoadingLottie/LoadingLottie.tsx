import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../globalStyles';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ILoadingLottieProps } from './interface';
import { isIos } from '../../utils/Platform';

export const LoadingLottie = (props: ILoadingLottieProps) => {
  const { containerStyle = {}, lottieContainer = {}, lottieProps = {} } = props;
  if (props?.showLoading === false) {
    return null;
  }
  return (
    <View
      style={StyleSheet.flatten([
        GlobalStyles.flex1,
        GlobalStyles.fullCenter,
        GlobalStyles.centerSelf,
        containerStyle,
      ])}>
      <View
        style={StyleSheet.flatten([
          GlobalStyles.centerSelf,
          { width: 64, height: 64 },
          lottieContainer,
        ])}>
        {isIos ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <LottieView
            // ref={animation}
            source={require('../../assets/animations/loading_black_circle.json')}
            autoPlay
            loop
            {...lottieProps}
            // style={{transform: [{scale: 0.8}]}}
          />
        )}
      </View>
    </View>
  );
};
