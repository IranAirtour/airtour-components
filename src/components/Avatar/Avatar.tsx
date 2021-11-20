import React from 'react';
import {
  View,
  Text,
  Image as RNImage,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageURISource,
  ImageStyle,
} from 'react-native';
import { renderNode, RneFunctionComponent } from '../Helpers';
import { Image, IImageProps } from '../Image';
import { Icon, IIconObject } from '../Icon';

const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

type AvatarIcon = IIconObject & {
  iconStyle?: StyleProp<TextStyle>;
};

export type AvatarBaseProps = {
  Component?: typeof React.Component;
  onPress?(): void;
  onLongPress?(): void;
  containerStyle?: StyleProp<ViewStyle>;
  source?: ImageSourcePropType;
  avatarStyle?: ImageStyle;
  rounded?: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  overlayContainerStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  icon?: AvatarIcon;
  iconStyle?: StyleProp<TextStyle>;
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number;
  placeholderStyle?: StyleProp<ViewStyle>;
  renderPlaceholderContent?: React.ReactElement<{}>;
  imageProps?: Partial<IImageProps>;
  ImageComponent?: React.ComponentClass;
  borderRadius?: number;
};

export const AvatarBase: RneFunctionComponent<AvatarBaseProps> = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size = 'small',
  avatarStyle,
  rounded = false,
  title,
  titleStyle,
  overlayContainerStyle,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent = RNImage,
  children,
  borderRadius = 0,
  ...attributes
}) => {
  let width = avatarSizes.small;
  width = typeof size === 'number' ? size : avatarSizes[size];

  const height = width;
  const titleSize = width / 2;
  const iconSize = width / 2;

  const PlaceholderContent =
    (renderPlaceholderContent &&
      renderNode(undefined, renderPlaceholderContent)) ||
    (title && (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}>
        {title}
      </Text>
    )) ||
    (icon && (
      <Icon
        style={StyleSheet.flatten([iconStyle && iconStyle])}
        color={icon.color || 'white'}
        name={icon.name || 'user'}
        size={icon.size || iconSize}
        type={icon.type && icon.type}
      />
    ));

  const hidePlaceholder = !(source && (source as ImageURISource).uri);

  const imageContainerStyle = StyleSheet.flatten([
    styles.overlayContainer,
    rounded && { borderRadius: width / 2, overflow: 'hidden' },
    overlayContainerStyle,
    imageProps && imageProps.containerStyle,
  ]);
  if (imageProps && imageProps.containerStyle) {
    delete imageProps.containerStyle;
  }

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={StyleSheet.flatten([
        styles.container,
        { height, width, borderRadius },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...attributes}>
      <Image
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle,
          hidePlaceholder && styles.hiddenPlaceholderStyle,
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={imageContainerStyle as StyleProp<TextStyle>}
        source={source}
        borderRadius={rounded ? width / 2 : borderRadius || 0}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  hiddenPlaceholderStyle: {
    backgroundColor: 'transparent',
  },
});

AvatarBase.displayName = 'AvatarBase';
