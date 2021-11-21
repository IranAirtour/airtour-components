import React from 'react';
import { images } from '../../assets';
import FastImage from 'react-native-fast-image';
import { Image } from '../Image';
import {GestureResponderEvent, TouchableWithoutFeedback, View} from 'react-native';
import { isAppStore } from '../../utils/Platform';

export const AirtourLogo = React.memo((props: { onPress: ((event: GestureResponderEvent) => void) | undefined }) => {
    const {onPress} = props;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {isAppStore ? null : (
          <Image
            source={images.logo}
            defaultSource={images.logo}
            style={{
              height: 30,
              width: 100,
              // aspectRatio: 3.3,
              priority: FastImage.priority.high,
              marginEnd: 20,
              // backgroundColor: 'red',
            }}
            ImageComponent={FastImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
});
