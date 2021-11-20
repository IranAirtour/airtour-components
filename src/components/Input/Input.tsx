import React, {FC} from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  Easing,
  Platform,
  StyleSheet,
  StyleProp,
  TextInputProps,
} from 'react-native';
import {renderNode} from '../Helpers/renderNode';
import {Icon} from '../Icon';
import {styles} from './styles';
import {IInputProps} from './interface';
import {withTheme} from '../Helpers/withTheme';

const renderText = (content: any, defaultProps: any, style: StyleProp<any>) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

class Input extends React.Component<IInputProps> {
  input: any;
  shakeAnimationValue = new Animated.Value(0);

  focus(): void {
    this.input.focus();
  }

  blur(): void {
    this.input.blur();
  }

  clear(): void {
    this.input.clear();
  }

  isFocused(): boolean {
    return this.input.isFocused();
  }

  setNativeProps(nativeProps: Partial<TextInputProps>): void {
    this.input.setNativeProps(nativeProps);
  }

  shake = () => {
    const {shakeAnimationValue} = this;
    shakeAnimationValue.setValue(0);
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const {
      containerStyle,
      disabled,
      disabledInputStyle,
      inputContainerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      InputComponent = TextInput,
      value = '',
      onChangeText,
      inputProps = {},
      inputStyle,
      errorProps,
      errorStyle,
      errorMessage,
      label,
      labelStyle,
      labelProps,
      renderErrorMessage = true,
      style,
      theme,
    } = this.props;

    const hideErrorMessage = !renderErrorMessage && !errorMessage;

    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {renderText(
          label,
          {style: labelStyle, ...labelProps},
          {
            fontSize: 16,
            color: theme?.colors?.border,
            ...Platform.select({
              default: {
                fontWeight: 'bold',
              },
            }),
          },
        )}

        <View
          style={StyleSheet.flatten([
            {
              height: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: theme?.colors?.border,
            },
            inputContainerStyle,
          ])}>
          {leftIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                leftIconContainerStyle,
              ])}>
              {renderNode(Icon, leftIcon)}
            </View>
          )}

          <InputComponent
            testID="RNE__Input__text-input"
            underlineColorAndroid="transparent"
            editable={!disabled}
            ref={(ref: any) => {
              this.input = ref;
            }}
            style={StyleSheet.flatten([
              {
                alignSelf: 'center',
                color: theme?.colors?.border,
                fontSize: 18,
                flex: 1,
                minHeight: 40,
              },
              inputStyle,
              disabled && styles.disabledInput,
              disabled && disabledInputStyle,
              style,
            ])}
            placeholderTextColor={theme?.colors?.border}
            value={value}
            onChangeText={onChangeText}
            {...inputProps}
          />

          {rightIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                rightIconContainerStyle,
              ])}>
              {renderNode(Icon, rightIcon)}
            </View>
          )}
        </View>

        <Text
          {...errorProps}
          style={StyleSheet.flatten([
            {
              margin: 5,
              fontSize: 12,
              color: theme?.colors?.notification,
            },
            errorStyle && errorStyle,
            hideErrorMessage && {
              height: 0,
              margin: 0,
              padding: 0,
            },
          ])}>
          {errorMessage}
        </Text>
      </View>
    );
  }
}

const shouldInputRender = (
  prevProps: IInputProps,
  nextProps: IInputProps,
): boolean => {
  return false;
  // return (
  //   prevProps?.value === nextProps?.value &&
  //   prevProps?.errorMessage === nextProps?.errorMessage &&
  //   prevProps?.currentFocusedInputId === nextProps?.currentFocusedInputId
  // );
};

export const InputMemorized: FC<IInputProps> = withTheme(
  React.memo((props: IInputProps) => {
    // only renders if props have changed
    // @ts-ignore
    return <Input {...props} />;
  }),
);

export default withTheme(Input);
