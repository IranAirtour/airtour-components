import { BackHandler, StyleSheet, View } from 'react-native';
import { BottomSheetButton, Text } from 'airtour-components';
import { flatten, GlobalStyles } from 'airtour-components/globalStyles';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { FileServiceClient } from '../../utils/FileAndImageService';
import { IFileModel } from '../../models/File';
import { getFileExtension, getFileName } from '../../utils/Other';
import { RNFetchBlobStat } from 'rn-fetch-blob';
import { FetchBlobClient } from '../../utils/FetchBlob';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import type {
  IFileBottomSheetProps,
  IBottomSheetButtonComponentProps,
} from './interface';
import { useThemeColors } from '../Theme/ThemeProvider';
import { isIos } from '../../utils/Platform';

const AnimatedView = Animated.View;

export const BottomSheetButtonComponent = (
  props: IBottomSheetButtonComponentProps,
) => {
  const {
    label,
    labelStyle,
    onPress,
    icon,
    showBorderBottomWidth = true,
  } = props;
  const themeColors = useThemeColors();
  return (
    <BottomSheetButton
      style={flatten([
        GlobalStyles.width100,
        GlobalStyles.flexRow,
        GlobalStyles.centerX,
        {
          borderBottomColor: themeColors.grey100,
          borderBottomWidth: showBorderBottomWidth ? 1 : 0,
          height: isIos ? 65 : 55,
          paddingHorizontal: 20,
          // marginVertical: 5,
        },
        GlobalStyles.justifyStart,
      ])}
      onPress={onPress}>
      <View>{icon ?? null}</View>
      <Text h6 style={flatten([{ marginHorizontal: 10 }, labelStyle])}>
        {label ?? ''}
      </Text>
    </BottomSheetButton>
  );
};
export const FileBottomSheet = React.forwardRef(
  (props: IFileBottomSheetProps, ref: any) => {
    const {
      snapBottomSheetTo,
      setBottomSheetAnimatedValue,
      bottomSheetIsOpen,
      bottomSheetAnimatedValue,
      onCameraPress,
      onGalleryPress,
      renderContent = null,
      maxSnapPoint = isIos ? 130 : 120,
      onCloseBottomSheet = null,
      opacity = 1,
    } = props;
    const onPressBottomSheetBack = useCallback(() => {
      snapBottomSheetTo(0);
      setBottomSheetAnimatedValue(0);
      onCloseBottomSheet?.();
    }, [onCloseBottomSheet, setBottomSheetAnimatedValue, snapBottomSheetTo]);
    const themeColors = useThemeColors();
    const shadowStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(bottomSheetAnimatedValue.value, {
          duration: 150,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }),
      };
    }, [bottomSheetAnimatedValue]);
    const onCameraPressCallback = useCallback(() => {
      onPressBottomSheetBack();
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
      onPressBottomSheetBack();
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
    const insets = useSafeAreaInsets();
    const renderContentCallback = useCallback(
      () => (
        <SafeAreaView
          edges={['left', 'bottom', 'right']}
          style={flatten([
            GlobalStyles.width100,
            GlobalStyles.height100,
            {
              backgroundColor: themeColors.backgroundPaper,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              opacity: opacity,
              // justifyContent: 'center',
            },
          ])}>
          {renderContent ? (
            renderContent()
          ) : (
            <>
              <BottomSheetButtonComponent
                label={'Camera'}
                onPress={onCameraPressCallback}
              />
              <BottomSheetButtonComponent
                label={'Gallery'}
                onPress={onGalleryPressCallback}
                showBorderBottomWidth={false}
              />
            </>
          )}
        </SafeAreaView>
      ),
      [renderContent],
    );
    const onOpenEnd = useCallback(() => {
      setBottomSheetAnimatedValue(1);
    }, []);
    const onOpenStart = useCallback(() => {
      setBottomSheetAnimatedValue(1);
    }, []);
    const onCloseEnd = useCallback(() => {
      onPressBottomSheetBack();
    }, []);

    const bottomSheetIsOpenRef = useRef<boolean>(bottomSheetIsOpen);
    const onBackPress = useCallback(() => {
      if (bottomSheetIsOpenRef.current) {
        onPressBottomSheetBack();
        return true;
      } else {
        return false;
      }
    }, [bottomSheetIsOpenRef, onPressBottomSheetBack]);
    useEffect(
      function () {
        bottomSheetIsOpenRef.current = bottomSheetIsOpen;
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return function () {
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        };
      },
      [bottomSheetIsOpen],
    );
    const snapPoint = useMemo(() => {
      return (isIos ? insets?.bottom : 0) + maxSnapPoint;
    }, [insets, maxSnapPoint]);
    return (
      <>
        <BottomSheet
          ref={ref}
          snapPoints={[0, snapPoint]}
          initialSnap={0}
          renderContent={renderContentCallback}
          onOpenEnd={onOpenEnd}
          onOpenStart={onOpenStart}
          onCloseEnd={onCloseEnd}
        />
        <AnimatedView
          pointerEvents={!bottomSheetIsOpen ? 'none' : 'auto'}
          style={[
            GlobalStyles.flex1,
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.4)',
            },
            shadowStyle,
          ]}>
          <TouchableOpacity
            containerStyle={flatten([
              GlobalStyles.width100,
              GlobalStyles.height100,
            ])}
            onPress={onPressBottomSheetBack}
          />
        </AnimatedView>
      </>
    );
  },
);
