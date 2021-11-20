import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../globalStyles';
import { IBaseViewProps } from './interface';
import { ErrorBoundary } from '../ErrorBoundary';
import { isIos } from '../../utils/Platform';

export const BaseScreenView: React.FC<IBaseViewProps> = (
  props: IBaseViewProps,
) => {
  const { children } = props;
  const STATUS_BAR_HEIGHT = isIos ? 20 : StatusBar.currentHeight;
  return (
    <ErrorBoundary>
      {/*<View*/}
      {/*  style={{*/}
      {/*    height: STATUS_BAR_HEIGHT,*/}
      {/*    backgroundColor: '#153D76',*/}
      {/*    position: 'absolute',*/}
      {/*    top: 0,*/}
      {/*  }}>*/}
      {/*  <StatusBar*/}
      {/*    translucent*/}
      {/*    backgroundColor="#153D76"*/}
      {/*    barStyle="light-content"*/}
      {/*  />*/}
      {/*</View>*/}
      <View
        style={StyleSheet.flatten([
          GlobalStyles.container,
          props?.containerStyle,
        ])}>
        {children}
      </View>
    </ErrorBoundary>
  );
};

export default BaseScreenView;
