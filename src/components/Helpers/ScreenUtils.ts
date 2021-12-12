import {
  Dimensions,
  StatusBar,
  Platform,
  PixelRatio,
  ScaledSize,
} from 'react-native';
import { logDebug, logWarn } from '../../utils/Logger';

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
// export const screenWidthSize = Math.min(width, height);
// export const screenHeightSize = Math.max(width, height);
// export const scaleFontSize = (size: number, maxSize = Infinity) => {
//   // const newSize = (screenWidthSize * size * 0.8) / 504;
//   const newSize =
//     (screenHeightSize * size * 0.9) /
//     Platform.select({ android: 896, ios: isIphoneX ? 920 : 896, default: 896 });
//   return newSize > maxSize ? maxSize : newSize;
// };

interface IScreenUtils {
  width: number;
  height: number;
  scaleFontSize(size: number, maxSize?: number): number;
}

export default class ScreenUtils implements IScreenUtils {
  public static width: number = width;
  public static height: number = height;
  public static aspectRatio: number = ScreenUtils.convertToPrecision(
    height / width,
  );
  static convertToPrecision(s: number, precision = 2): number {
    return Number(s.toPrecision(precision));
  }
  static initializeDimensions() {
    const { width: w, height: h } = Dimensions.get('window');
    ScreenUtils.width = w;
    ScreenUtils.height = h;
    ScreenUtils.aspectRatio = ScreenUtils.convertToPrecision(h / w);
  }

  static changeDimensionHandler({ window }: { window: ScaledSize }) {
    const { width: w, height: h } = window;
    ScreenUtils.width = w;
    ScreenUtils.height = h;
    ScreenUtils.aspectRatio = ScreenUtils.convertToPrecision(h / w);
    // logWarn(window, (window.height / window.width).toString());
  }

  static subscribeToScreenRotation() {
    // type: 'change',
    // handler: ({ window, screen }: { window: ScaledSize; screen: ScaledSize }
    Dimensions.addEventListener('change', ScreenUtils.changeDimensionHandler);
  }

  static unSubscribeToScreenRotation() {
    Dimensions.removeEventListener(
      'change',
      ScreenUtils.changeDimensionHandler,
    );
  }

  static scaleBaseOnAspectRation(s: number): number {
    const ratio = ScreenUtils.aspectRatio;
    logDebug(ratio, 'ratio:');
    // alert(ratio)
    if (ratio >= 1) {
      if (ratio < 1.5) {
        return s * 0.8;
      } else if (ratio >= 1.5 && ratio < 1.65) {
        return s * 0.9;
      } else if (ratio >= 1.65 && ratio < 1.75) {
        return s;
      } else if (ratio >= 1.75 && ratio < 2) {
        return s;
      }
      return s;
    } else {
      if (ratio > 0.9) {
        return s * 0.9;
      } else if (ratio >= 0.7 && ratio < 0.9) {
        return s * 0.7;
      } else if (ratio >= 0.55 && ratio < 0.7) {
        return s * 0.95;
      } else if (ratio >= 0.4 && ratio < 0.55) {
        return s * 0.45;
      } else if (ratio >= 0.3 && ratio < 0.4) {
        return s * 0.35;
      }
      return s;
    }
  }

  static scaleFontSize(size: number, multiplier?: number) {
    // const scale =
    //   ScreenUtils.aspectRatio *
    //   (multiplier ? multiplier : ScreenUtils.aspectRatio >= 1 ? 1.5 : 2.5);
    // const newSize =
    //   (screenHeightSize * size * 0.9) /
    //   Platform.select({android: 896, ios: isIphoneX ? 920 : 896, default: 896});
    // return newSize > maxSize ? maxSize : newSize;

    return PixelRatio.roundToNearestPixel(size);

    // return Math.round(
    //   PixelRatio.roundToNearestPixel(ScreenUtils.scaleBaseOnAspectRation(size)),
    // );
  }

  static w(percent: number): number {
    return Math.round(
      PixelRatio.roundToNearestPixel((ScreenUtils.width * percent) / 100),
    );
  }

  static h(percent: number): number {
    return Math.round(
      PixelRatio.roundToNearestPixel((ScreenUtils.height * percent) / 100),
    );
  }
  static isLandscape(): boolean {
    return ScreenUtils.width > ScreenUtils.height;
  }
  static isTabletOrLandscape(size?: string): boolean {
    if (size) {
      switch (size) {
        case 'lg':
        case 'xl':
        case 'xxl':
          return true;
        default:
          return false;
      }
    }
    return ScreenUtils.isLandscape();
  }
}
