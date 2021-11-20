import { StyleSheet } from 'react-native';
import { BottomSheetButton, ScreenUtils, Text } from 'airtour-components';
import { flatten, GlobalStyles } from 'airtour-components/globalStyles';
import React, { useCallback } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../../resources/colors';
import { FileServiceClient } from '../../utils/FileService';
import { IFileModel } from '../../models/Chat/File';
import { getFileExtension, getFileName } from '../../utils/Other';
import { RNFetchBlobStat } from 'rn-fetch-blob';
import { FetchBlobClient } from '../../utils/FetchBlob';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAndroid } from '../../utils/Platform';

const AnimatedView = Animated.View;

const BottomSheetButtonComponent = (props: any) => {
  const { label, onPress } = props;
  return (
    <BottomSheetButton
      style={flatten([
        GlobalStyles.width100,
        GlobalStyles.fullCenter,
        {
          borderBottomColor: '#FAFCFE',
          borderBottomWidth: 1,
        },
      ])}
      onPress={onPress}>
      <Text>{label ?? ''}</Text>
    </BottomSheetButton>
  );
};
export const FileBottomSheet = React.forwardRef((props: any, ref: any) => {
  const {
    snapBottomSheetTo,
    setBottomSheetAnimatedValue,
    bottomSheetIsOpen,
    bottomSheetAnimatedValue,
    onCameraPress,
    onGalleryPress,
    opacity = 1,
  } = props;
  const shadowStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(bottomSheetAnimatedValue.value, {
        duration: 150,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [bottomSheetAnimatedValue]);
  const onCameraPressCallback = useCallback(() => {
    snapBottomSheetTo(0);
    setBottomSheetAnimatedValue(0);
    FileServiceClient.takePicture(false).then(async result => {
      const file: IFileModel = {
        name: getFileName(result?.path),
        path: result?.path,
        size: result?.size,
        type: result?.mime,
        uri: null,
        id: null,
        hash: null,
        extension:
          result?.mime?.length && result?.mime.indexOf('/') > -1
            ? result?.mime.split('/')?.[1] ?? 'png'
            : 'png',
      };
      if (!file?.size || !file?.name) {
        try {
          const fileStat: RNFetchBlobStat = await FetchBlobClient.getFileStat(
            file?.uri,
          );
          file.size = fileStat?.size || 1024;
          file.name = fileStat?.filename || getFileName(file?.uri);
          file.extension = getFileExtension(fileStat?.filename) ?? 'file';
        } catch (_) {}
      }
      onCameraPress?.(file);
    });
  }, [snapBottomSheetTo, setBottomSheetAnimatedValue, onCameraPress]);
  const onGalleryPressCallback = useCallback(() => {
    snapBottomSheetTo(0);
    setBottomSheetAnimatedValue(0);
    FileServiceClient.pickImage(true, false).then(async result => {
      const file: IFileModel = {
        name: getFileName(result?.path),
        path: result?.path,
        size: result?.size,
        type: result?.mime,
        uri: null,
        id: null,
        hash: null,
        extension:
          result?.mime?.length && result?.mime.indexOf('/') > -1
            ? result?.mime.split('/')?.[1] ?? 'png'
            : 'png',
      };
      if (!file?.size || !file?.name) {
        try {
          const fileStat: RNFetchBlobStat = await FetchBlobClient.getFileStat(
            file?.uri,
          );
          file.size = fileStat?.size || 1024;
          file.name = fileStat?.filename || getFileName(file?.uri);
          file.extension = getFileExtension(fileStat?.filename) ?? 'file';
        } catch (_) {}
      }
      onGalleryPress?.(file);
    });
  }, [snapBottomSheetTo, setBottomSheetAnimatedValue, onGalleryPress]);

  const onFilePress = useCallback(() => {}, []);

  const renderContent = useCallback(
    () => (
      <SafeAreaView
        edges={['left', 'bottom', 'right']}
        style={flatten([
          GlobalStyles.width100,
          GlobalStyles.height100,
          {
            backgroundColor: colors.white,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            justifyContent: 'space-around',
            opacity: opacity,
          },
        ])}>
        <BottomSheetButtonComponent
          label={'Camera'}
          onPress={onCameraPressCallback}
        />
        <BottomSheetButtonComponent
          label={'Gallery'}
          onPress={onGalleryPressCallback}
        />
        {/*<BottomSheetButtonComponent label={'File'} onPress={onFilePress} />*/}
      </SafeAreaView>
    ),
    [],
  );
  return (
    <>
      <BottomSheet
        ref={ref}
        snapPoints={[isAndroid ? -100 : 0, 100]}
        initialSnap={0}
        renderContent={renderContent}
        onOpenEnd={() => {
          setBottomSheetAnimatedValue(1);
        }}
        onOpenStart={() => {
          setBottomSheetAnimatedValue(1);
        }}
        onCloseEnd={() => {
          setBottomSheetAnimatedValue(0);
        }}
      />
      <AnimatedView
        pointerEvents={!bottomSheetIsOpen ? 'none' : 'auto'}
        style={[
          GlobalStyles.flex1,
          {
            ...StyleSheet.absoluteFillObject,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          shadowStyle,
        ]}>
        <TouchableOpacity
          containerStyle={flatten([
            GlobalStyles.width100,
            GlobalStyles.height100,
          ])}
          onPress={() => {
            snapBottomSheetTo(0);
            setBottomSheetAnimatedValue(0);
          }}
        />
      </AnimatedView>
    </>
  );
});
