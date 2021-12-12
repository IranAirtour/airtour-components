import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../globalStyles';
import { IBaseViewProps } from './interface';
import { ErrorBoundary } from '../ErrorBoundary';
import { ThemeConsumer } from '../Theme/ThemeProvider';

export const BaseScreenView: React.FC<IBaseViewProps> = (
  props: IBaseViewProps,
) => {
  return (
    <ErrorBoundary>
      <ThemeConsumer>
        {themeContext => {
          return (
            <View
              style={StyleSheet.flatten([
                GlobalStyles.flex1,
                { backgroundColor: themeContext.theme.colors.backgroundMain },
                props?.containerStyle,
              ])}>
              {props?.children ?? null}
            </View>
          );
        }}
      </ThemeConsumer>
    </ErrorBoundary>
  );
};
BaseScreenView.displayName = 'BaseScreenView';
export default BaseScreenView;
