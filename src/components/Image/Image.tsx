import React, { useMemo } from 'react';
import {
  Image as ImageNative,
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ImageStyle,
} from 'react-native';
import type { IImageProps } from './interface';
import { styles } from './styles';
import {AsyncStorageService} from "../../utils/AsyncStorageService";
import {TokenTypes} from "../../resources/strings";

const Image = (props: IImageProps) => {
  const {
    onPress,
    onLongPress,
    Component = onPress || onLongPress ? TouchableOpacity : View,
    placeholderStyle,
    containerStyle = {},
    style = {},
    ImageComponent = ImageNative,
    childrenContainerStyle = null,
    PlaceholderContent,
    borderRadius = 0,
    source,
    ...attributes
  } = props;
  const hasImage = source?.uri?.length ? Boolean(source?.uri) : Boolean(source);
  const { width, height, ...styleProps } = StyleSheet.flatten(style);
  const sourceMemo = useMemo(() => {
    if (source?.uri) {
      return {
        ...source,
        headers: {
          Authorization: 'Bearer ' + AsyncStorageService.getItem(TokenTypes.AccessToken),
        },
      };
    }
    return source;
  }, [source]);
  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        {
          borderRadius: styleProps?.borderRadius || borderRadius || 0,
          overflow: 'hidden',
        },
      ])}>
      <ImageComponent
        testID="RNE__Image"
        transition={true}
        transitionDuration={360}
        {...attributes}
        source={sourceMemo}
        onLoad={this.onLoad}
        style={StyleSheet.flatten([
          StyleSheet.absoluteFill,
          {
            width: width,
            height: height,
          } as StyleProp<ImageStyle>,
          styleProps,
          {
            borderRadius: 0,
          },
        ])}
        borderRadius={0}
      />
      <View
        pointerEvents={hasImage ? 'none' : 'auto'}
        accessibilityElementsHidden={hasImage}
        importantForAccessibility={hasImage ? 'no-hide-descendants' : 'yes'}
        style={[
          styles.placeholderContainer,
          {
            opacity: hasImage ? 0 : 1,
          },
        ]}>
        <View
          testID="RNE__Image__placeholder"
          style={StyleSheet.flatten([
            style,
            styles.placeholder,
            placeholderStyle,
          ])}>
          {PlaceholderContent ?? null}
        </View>
      </View>

      <View
        testID="RNE__Image__children__container"
        style={childrenContainerStyle ?? style}>
        {props?.children ?? null}
      </View>
    </Component>
  );
};

export default Image;
