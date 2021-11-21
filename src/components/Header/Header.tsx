import React, { useMemo } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ImageBackground,
  FlexAlignType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { renderNode } from '../Helpers';

import { Text } from '../Text';
import { Icon } from '../Icon';
import { styles } from './styles';
import { IHeaderChildrenProps, IHeaderProps, IPlacement } from './interface';
import Androw from 'react-native-androw';
import { generateShadowStyle } from '../../utils/Other';
import { GlobalStyles } from '../globalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColors } from '../Theme/ThemeProvider';
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
  const themeColors = useThemeColors();
  const SafeAreaComponent = useMemo(() => {
    return withSafeArea ? SafeAreaView : View;
  }, [withSafeArea]);
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        backgroundColor={backgroundColor || themeColors.backgroundPaper}
        barStyle={barStyle ?? 'dark-content'}
        {...statusBarProps}
      />
      <ViewComponent
        testID="headerContainer"
        {...attributes}
        style={StyleSheet.flatten([
          GlobalStyles.width100,
          {
            borderBottomColor: themeColors.grey50,
            borderBottomWidth: StyleSheet.hairlineWidth,
            paddingHorizontal: 10,
            paddingBottom: 2,
            backgroundColor: themeColors.backgroundPaper,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          backgroundColor && { backgroundColor },
          withShadow && generateShadowStyle(shadowColor),
          containerStyle,
          {
            // @ts-ignore
            // height: 52 + insets.top,
            height: (containerStyle?.height ?? 52) + insets.top,
          },
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
              paddingTop: 10,
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
