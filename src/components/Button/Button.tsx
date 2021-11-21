import React, { FC, useCallback } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import { renderNode, ScreenUtils } from '../Helpers';
import Color from 'color';
import { Icon } from '../Icon/index';
import { styles } from './styles';
import { IButtonProps } from './interface';
import { flatten, GlobalStyles } from '../globalStyles';
import { useThemeColors } from '../Theme/ThemeProvider';
import { IColors } from '../../resources/colors';

const Button: FC<IButtonProps> = props => {
  const themeColors: IColors = useThemeColors();
  const {
    TouchableComponent,
    containerStyle,
    onPress = () => {},
    buttonStyle,
    type = 'clear',
    loading = false,
    loadingStyle,
    loadingProps: passedLoadingProps,
    title = '',
    titleProps,
    titleStyle: passedTitleStyle,
    icon,
    iconContainerStyle,
    iconRight = false,
    disabled = false,
    disabledStyle,
    disabledTitleStyle,
    linearGradientProps,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    h7,
    h8,
    h9,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h5Style,
    h6Style,
    h7Style,
    h8Style,
    h9Style,
    ViewComponent = View,
    ...attributes
  } = props;

  const handleOnPress = useCallback(
    evt => {
      if (!loading) {
        onPress(evt);
      }
    },
    [loading, onPress],
  );

  // Refactor to Pressable
  const TouchableComponentInternal = TouchableComponent || TouchableOpacity;

  const titleStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    GlobalStyles.noMarginXY,
    GlobalStyles.noPaddingXY,
    GlobalStyles.centerText,
    {
      color: type === 'solid' ? 'white' : themeColors?.textDark,
      includeFontPadding: false,
    },
    h1 && flatten([{ fontSize: ScreenUtils.scaleFontSize(40) }, h1Style]),
    h2 && flatten([{ fontSize: ScreenUtils.scaleFontSize(34) }, h2Style]),
    h3 && flatten([{ fontSize: ScreenUtils.scaleFontSize(28) }, h3Style]),
    h4 && flatten([{ fontSize: ScreenUtils.scaleFontSize(22) }, h4Style]),
    h5 && flatten([{ fontSize: ScreenUtils.scaleFontSize(20) }, h5Style]),
    h6 && flatten([{ fontSize: ScreenUtils.scaleFontSize(18) }, h6Style]),
    h7 && flatten([{ fontSize: ScreenUtils.scaleFontSize(16) }, h7Style]),
    h8 && flatten([{ fontSize: ScreenUtils.scaleFontSize(14) }, h8Style]),
    h9 && flatten([{ fontSize: ScreenUtils.scaleFontSize(10) }, h9Style]),
    styles.title,
    passedTitleStyle,
    disabled && disabledTitleStyle,
  ]);

  const background =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback.Ripple(
          Color(titleStyle?.color?.toString()).alpha(0.32).rgb().string(),
          true,
        )
      : undefined;

  const accessibilityState = {
    disabled: !!disabled,
    busy: !!loading,
  };

  return (
    <TouchableComponentInternal
      onPress={handleOnPress}
      delayPressIn={0}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      disabled={disabled}
      background={background}
      style={[
        GlobalStyles.fullCenter,
        styles.container,
        {
          borderRadius: 3 || styles.container.borderRadius,
        },
        containerStyle,
        // raised && !disabled && type !== 'clear' && styles.raised,
      ]}
      {...attributes}>
      <ViewComponent
        {...linearGradientProps}
        style={StyleSheet.flatten([
          styles.button,
          GlobalStyles.fullCenter,
          {
            backgroundColor:
              type === 'solid' ? themeColors?.backgroundPaper : 'transparent',
            borderColor: themeColors?.backgroundPaper,
            borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
          },
          buttonStyle,
          disabled &&
            type === 'solid' && {
              backgroundColor: themeColors?.grey100,
            },
          disabled &&
            type === 'outline' && {
              borderColor: Color(themeColors?.grey100).darken(0.3).string(),
            },
          disabled && disabledStyle,
        ])}>
        {loading ? (
          <ActivityIndicator
            style={StyleSheet.flatten([styles.loading, loadingStyle])}
            color={themeColors?.backgroundMain}
            size={'small'}
            {...passedLoadingProps}
          />
        ) : null}

        {!loading && icon && !iconRight
          ? renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })
          : null}

        {!loading && !!title
          ? renderNode(Text, title, {
              style: titleStyle,
              ...titleProps,
            })
          : null}

        {!loading && icon && iconRight
          ? renderNode(Icon, icon, {
              containerStyle: StyleSheet.flatten([
                styles.iconContainer,
                iconContainerStyle,
              ]),
            })
          : null}
      </ViewComponent>
    </TouchableComponentInternal>
  );
};

Button.defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  h7: false,
  h8: false,
  h9: false,
  h1Style: {},
  h2Style: {},
  h3Style: {},
  h4Style: {},
  h5Style: {},
  h6Style: {},
  h7Style: {},
  h8Style: {},
  h9Style: {},
};

export default Button;
