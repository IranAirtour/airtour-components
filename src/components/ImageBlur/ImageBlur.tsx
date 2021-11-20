import React from 'react';
import {Blurhash} from 'react-native-blurhash';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {styles} from './styles';
import {Image} from '../index';
import {FC, useState} from 'react';
import {IImageBlur} from './interface';

const ImageBlur: FC<IImageBlur> = (props: IImageBlur) => {
  const {
    containerStyle = {},
    blurStyle = {},
    blurhashProps: {blurhash = null},
    imageProps,
    borderRadius = null,
  } = props;
  const [showBlurImage, setShowBlurImage] = useState(!!blurhash);
  if (!blurhash) {
    return <Image containerStyle={containerStyle} {...imageProps} />;
  }
  const container: StyleProp<ViewStyle> = {};
  if (borderRadius) {
    container.borderRadius = borderRadius;
    container.overflow = 'hidden';
  }
  return (
    <View
      style={StyleSheet.flatten([styles.container, container, containerStyle])}>
      <Image
        {...imageProps}
        containerStyle={StyleSheet.flatten([StyleSheet.absoluteFillObject])}
        onLoadEnd={() => {
          if (showBlurImage) {
            setShowBlurImage(false);
          }
        }}
      />
      {showBlurImage ? (
        <Blurhash
          decodeAsync={true}
          decodeWidth={16}
          decodeHeight={16}
          resizeMode="cover"
          style={StyleSheet.flatten([
            styles.blurStyle,
            containerStyle,
            blurStyle,
          ])}
          {...props?.blurhashProps}
        />
      ) : null}
    </View>
  );
};
export {ImageBlur};
