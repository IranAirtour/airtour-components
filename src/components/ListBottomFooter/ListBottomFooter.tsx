import React, {FC, memo, useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {ScreenUtils} from '../Helpers';
import {IListBottomFooter} from './interface';

const ListBottomFooter: FC<IListBottomFooter> = memo(
  (props: IListBottomFooter) => {
    const {showLoading, animationFile} = props;
    const ref = useRef<LottieView>(null);

    useEffect(() => {
      if (showLoading) {
        ref?.current?.play();
      } else {
        ref?.current?.pause();
      }
    }, [showLoading]);
    return (
      <View
        style={{
          width: '100%',
          height: ScreenUtils.height * 0.05,
        }}>
        <LottieView
          source={
            animationFile ||
            require('../../assets/animations/loading_blue_circle.json')
          }
          ref={ref}
        />
      </View>
    );
  },
);
export {ListBottomFooter};
