import { LayoutAnimation } from 'react-native';
import { isIos } from './Platform';

export class SimpleLayoutAnimations {
  static easeInOut() {
    if (!isIos) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }

  static spring() {
    if (!isIos) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  }

  static customAnimation(animConfig = null) {
    if (isIos) {
      return;
    }
    const config = animConfig
      ? animConfig
      : LayoutAnimation.create(
          100,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity,
        );
    LayoutAnimation.configureNext(config as any);
  }
}
