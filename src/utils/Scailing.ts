import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
//Default guideline sizes are based on standard ~5" screen mobile device
let isTablet= false
if (shortDimension >= 600 && longDimension >= 840 ){
  isTablet = true
}
const guidelineBaseWidth = isTablet ? 768 : 375;
const guidelineBaseHeight = isTablet? 1024 : 812;

const scale = (size: number) => Math.round((shortDimension / guidelineBaseWidth) * size);
const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { scale, verticalScale, moderateScale };

export default { rs: scale, vs: verticalScale, ms: moderateScale };
