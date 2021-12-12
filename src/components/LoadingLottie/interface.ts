import {StyleProp, ViewStyle} from 'react-native';
import LottieView from 'lottie-react-native';

export interface ILoadingLottieProps {
  showLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  lottieContainer?: StyleProp<ViewStyle>;
  lottieProps?: any;
}
