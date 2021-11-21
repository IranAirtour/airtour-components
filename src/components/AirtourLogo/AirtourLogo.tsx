import React from 'react';
import { images } from '../../assets';
import FastImage from 'react-native-fast-image';
import { Image } from '../Image';
import { TouchableWithoutFeedback, View } from 'react-native';
// import { NavHandler } from '../../navigation/navConfig';
// import { ScreenNames } from '../../resources/strings';
// import { useAppDispatch } from '../../redux/store';
// import { changeCurrentApp } from '../../redux/slices/globalSlice';
import { isAppStore } from '../../utils/Platform';

export const AirtourLogo = React.memo((props: any) => {
  // const dispatch = useAppDispatch();
  // const onPress = useCallback(() => {
  //   dispatch(changeCurrentApp(null));
  //   NavHandler.replace({
  //     name: ScreenNames.MainScreenDrawer,
  //     params: {},
  //   });
  // }, []);
  return (
    <TouchableWithoutFeedback onPress={props?.onPress}>
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
