import { Dimensions, StatusBar, Platform, PixelRatio } from 'react-native';

/**
 * Window width ,height Dimensions
 */
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
//iphone x
const X_WIDTH = 375;
const X_HEIGHT = 812;

//iphone xsmax
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

/**
 *
 * determine in mobile is iphoneX or not
 * @return {boolean}
 * @private
 */
function _isIphoneX() {
  let isIPhoneX = false;

  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX =
      (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT);
  }

  return isIPhoneX;
}

export const isIphoneX = _isIphoneX();
/**
 * ios status bar height
 */
export const STATUS_BAR_HEIGHT_IOS = Platform.select({
  ios: isIphoneX ? 44 : 20,
  android: 0,
});

/**
 * android status bar height
 */
export const STATUS_BAR_HEIGHT_ANDROID = Platform.select({
  android: StatusBar.currentHeight,
  ios: 0,
});
export const screenWidthSize = Math.min(width, height);
export const screenHeightSize = Math.max(width, height);
export const scaleFontSize = (size: number, maxSize = Infinity) => {
  // const newSize = (screenWidthSize * size * 0.8) / 504;
  const newSize =
    (screenHeightSize * size * 0.9) /
    Platform.select({ android: 896, ios: isIphoneX ? 920 : 896, default: 896 });
  return newSize > maxSize ? maxSize : newSize;
};

interface IScreenUtils {
  width: number;
  height: number;

  scaleFontSize(size: number, maxSize?: number): number;
}

export default class ScreenUtils<T extends IScreenUtils> {
  public static width: number = width;
  public static height: number = height;
  public static aspectRatio: number = height / width;

  static scaleBaseOnAspectRation(s: number): number {
    const ratio = ScreenUtils.aspectRatio;
    // alert(ratio)
    if (ratio < 1.5) {
      return s * 0.9;
    } else if (ratio >= 1.5 && ratio < 1.65) {
      return s * 0.9;
    } else if (ratio >= 1.65 && ratio < 1.75) {
      return s;
    } else if (ratio >= 1.75 && ratio < 2) {
      return s;
    } else {
      return s * 1.1;
    }
  }
  static scaleFontSize(size: number, multiplier = 1.5) {
    const scale = (width / height) * multiplier;
    const newSize = size * scale;
    return Math.round(
      PixelRatio.roundToNearestPixel(
        ScreenUtils.scaleBaseOnAspectRation(newSize),
      ),
    );
    // const newSize =
    //   (screenHeightSize * size * 0.9) /
    //   Platform.select({android: 896, ios: isIphoneX ? 920 : 896, default: 896});
    // return newSize > maxSize ? maxSize : newSize;
  }
  static w(percent: number): number {
    return (ScreenUtils.width * percent) / 100;
  }
  static h(percent: number): number {
    return (ScreenUtils.height * percent) / 100;
  }
}
