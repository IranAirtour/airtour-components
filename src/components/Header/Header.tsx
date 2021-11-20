import React, { useMemo } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  FlexAlignType,
} from 'react-native';
import {
  SafeAreaView,
  useSafeArea,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { renderNode } from '../Helpers';
import { useIsFocused } from '@react-navigation/native';

import { Text } from '../Text';
import { Icon } from '../Icon';
import { styles } from './styles';
import { Theme, useTheme } from '@react-navigation/native';
import { IHeaderChildrenProps, IHeaderProps, IPlacement } from './interface';
import Androw from 'react-native-androw';
import { generateShadowStyle } from '../../utils/Other';
import { GlobalStyles } from '../globalStyles';
const ALIGN_STYLE: Record<IPlacement, FlexAlignType> = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

const Children = ({ style, placement, children }: IHeaderChildrenProps) => (
  <View
    style={StyleSheet.flatten([{ alignItems: ALIGN_STYLE[placement] }, style])}>
    {children == null || children === false
      ? null
      : children.text
      ? renderNode(Text, children.text, { numberOfLines: 1, ...children })
      : children.icon
      ? renderNode(Icon, {
          ...children,
          name: children.icon,
          containerStyle: StyleSheet.flatten([
            { alignItems: ALIGN_STYLE[placement] },
            children.containerStyle,
          ]),
        })
      : renderNode(Text, children)}
  </View>
);

const Header: React.FunctionComponent<IHeaderProps> = props => {
  const {
    withShadow = false,
    withSafeArea = true,
    shadowColor = '#cecece',
    leftComponent,
    centerComponent,
    rightComponent,
    leftContainerStyle,
    centerContainerStyle,
    rightContainerStyle,
    backgroundColor,
    backgroundImage,
    backgroundImageStyle,
    containerStyle,
    placement = 'center',
    children = [],
    linearGradientProps,
    ViewComponent = linearGradientProps || !backgroundImage
      ? withShadow
        ? Androw
        : View
      : ImageBackground,
    barStyle,
    statusBarProps = {},
    ...attributes
  } = props;
  const theme: Theme = useTheme();
  const SafeAreaComponent = useMemo(() => {
    return withSafeArea ? SafeAreaView : View;
  }, [withSafeArea]);
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  return (
    <>
      {isFocused ? (
        <StatusBar
          translucent={Platform.OS === 'ios'}
          backgroundColor={backgroundColor || theme?.colors?.primary}
          barStyle={barStyle ?? 'dark-content'}
          {...statusBarProps}
        />
      ) : null}
      <ViewComponent
        testID="headerContainer"
        {...attributes}
        style={StyleSheet.flatten([
          GlobalStyles.width100,
          {
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingHorizontal: 10,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: theme.colors.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // height: 46,
          },
          backgroundColor && { backgroundColor },
          withShadow && generateShadowStyle(shadowColor),
          containerStyle,
          // @ts-ignore
          // height: 52 + insets.top,
          { height: (containerStyle?.height ?? 52) + insets.top },
        ])}
        source={backgroundImage}
        imageStyle={backgroundImageStyle}
        {...linearGradientProps}>
        <SafeAreaComponent
          edges={['left', 'top', 'right']}
          style={StyleSheet.flatten([
            styles.headerSafeView,
            GlobalStyles.fullCenter,
            GlobalStyles.flex1,
            {
              // paddingTop: withSafeArea ? (Platform.OS === 'ios' ? 0 : 0) : 0,
            },
          ])}>
          <Children
            style={StyleSheet.flatten([
              placement === 'center' && styles.rightLeftContainer,
              leftContainerStyle,
            ])}
            placement="left">
            {(React.isValidElement(children) && children) ||
              children[0] ||
              leftComponent}
          </Children>
          <Children
            style={StyleSheet.flatten([
              styles.centerContainer,
              placement !== 'center' && {
                paddingHorizontal: Platform.select({
                  android: 16,
                  default: 15,
                }),
              },
              centerContainerStyle,
            ])}
            placement={placement}>
            {children[1] || centerComponent}
          </Children>

          <Children
            style={StyleSheet.flatten([
              placement === 'center' && styles.rightLeftContainer,
              rightContainerStyle,
            ])}
            placement="right">
            {children[2] || rightComponent}
          </Children>
        </SafeAreaComponent>
      </ViewComponent>
    </>
  );
};

export default Header;
