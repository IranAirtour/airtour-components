import React from 'react';
import {
  Platform,
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native';

import Color from 'color';
import getIconType from './getIconType';
import { styles } from './styles';
import { IIconProps } from './interface';
import { useThemeColors } from '../Theme/ThemeProvider';

const Icon: React.FC<IIconProps> = props => {
  const {
    type = 'ionicon',
    name,
    size = 24,
    color: colorProp,
    iconStyle,
    iconProps,
    underlayColor = 'transparent',
    reverse = false,
    raised = false,
    containerStyle,
    reverseColor: reverseColorProp,
    disabled = false,
    disabledStyle,
    onPress,
    Component = onPress
      ? Platform.select<typeof React.Component>({
          android: TouchableNativeFeedback,
          default: TouchableHighlight,
        })
      : View,
    theme,
    ...attributes
  } = props;
  const themeColors = useThemeColors();
  const color = colorProp || theme?.colors?.black || themeColors?.grey800;
  const reverseColor =
    reverseColorProp || theme?.colors?.white || themeColors?.backgroundPaper;
  const IconComponent = getIconType(type);

  const getBackgroundColor = () => {
    if (reverse) {
      return color;
    }
    return (
      (raised ? theme?.colors?.white : 'transparent') ??
      themeColors?.backgroundPaper
    );
  };

  const buttonStyles = {
    borderRadius: size + 4,
    height: size * 2 + 4,
    width: size * 2 + 4,
  };

  if (Platform.OS === 'android' && !attributes.background) {
    if (Platform.Version >= 21) {
      attributes.background = TouchableNativeFeedback.Ripple(
        Color(color).alpha(0.2).rgb().string(),
        true,
      );
    }
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        (reverse || raised) && styles.button,
        (reverse || raised) && buttonStyles,
        raised && styles.raised,
        iconStyle && iconStyle.borderRadius
          ? {
              borderRadius: iconStyle.borderRadius,
            }
          : {},
        containerStyle && containerStyle,
      ])}>
      <Component
        {...attributes}
        {...(onPress && {
          onPress,
          disabled,
          underlayColor: reverse ? color : underlayColor,
          activeOpacity: 0.3,
        })}>
        <View
          style={StyleSheet.flatten([
            (reverse || raised) && buttonStyles,
            {
              backgroundColor: getBackgroundColor(),
              alignItems: 'center',
              justifyContent: 'center',
            },
            disabled && styles.disabled,
            disabled && disabledStyle,
          ])}>
          <IconComponent
            testID="iconIcon"
            style={StyleSheet.flatten([
              { backgroundColor: 'transparent' },
              iconStyle && iconStyle,
            ])}
            size={size}
            name={name}
            color={reverse ? reverseColor : color}
            {...iconProps}
          />
        </View>
      </Component>
    </View>
  );
};

export default Icon;
