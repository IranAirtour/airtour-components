import {IImageProps} from '../Image';
import {StyleProp, ViewStyle} from 'react-native';
import {BlurhashProps} from 'react-native-blurhash';

export interface IImageBlur {
  blurhashProps: BlurhashProps;
  borderRadius?: number;
  imageProps: IImageProps;
  containerStyle?: StyleProp<ViewStyle>;
  blurStyle?: StyleProp<ViewStyle>;
}
