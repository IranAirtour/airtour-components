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
  ActivityIndicatorProps,
  TextStyle,
} from 'react-native';
import { renderNode } from '../Helpers';
import Color from 'color';
import { Icon } from '../Icon/index';
import { Theme, useTheme } from '@react-navigation/native';
import { styles } from './styles';
import { IButtonProps } from './interface';
import { GlobalStyles } from '../globalStyles';

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme,
): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : theme?.colors?.primary,
  size: 'small',
});

const Button: FC<IButtonProps> = props => {
  const theme: Theme = useTheme();
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
    raised = false,
    linearGradientProps,
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
    {
      color: type === 'solid' ? 'white' : theme?.colors?.primary,
    },
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

  const loadingProps: ActivityIndicatorProps = {
    ...defaultLoadingProps(type, theme),
    ...passedLoadingProps,
  };

  const accessibilityState = {
    disabled: !!disabled,
    busy: !!loading,
  };

  return (
    <TouchableComponentInternal
      onPress={handleOnPress}
      delayPressIn={0}
      activeOpacity={0.3}
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
          {
            backgroundColor:
              type === 'solid' ? theme?.colors?.primary : 'transparent',
            borderColor: theme?.colors?.primary,
            borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
          },
          buttonStyle,
          disabled &&
            type === 'solid' && {
              backgroundColor: theme?.colors?.border,
            },
          disabled &&
            type === 'outline' && {
              borderColor: Color(theme?.colors?.border).darken(0.3).string(),
            },
          disabled && disabledStyle,
        ])}>
        {loading && (
          <ActivityIndicator
            style={StyleSheet.flatten([styles.loading, loadingStyle])}
            color={loadingProps.color}
            size={loadingProps.size}
            {...loadingProps}
          />
        )}

        {!loading &&
          icon &&
          !iconRight &&
          renderNode(Icon, icon, {
            containerStyle: StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle,
            ]),
          })}

        {!loading &&
          !!title &&
          renderNode(Text, title, {
            style: titleStyle,
            ...titleProps,
          })}

        {!loading &&
          icon &&
          iconRight &&
          renderNode(Icon, icon, {
            containerStyle: StyleSheet.flatten([
              styles.iconContainer,
              iconContainerStyle,
            ]),
          })}
      </ViewComponent>
    </TouchableComponentInternal>
  );
};

export default Button;
