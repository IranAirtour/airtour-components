import { StyleSheet, View } from 'react-native';
import { Modal } from '../Modal';
import React, { useMemo } from 'react';
import LottieView from 'lottie-react-native';
import { Text } from '../Text';
import { flatten, GlobalStyles } from '../globalStyles';
import { Theme, useTheme } from '@react-navigation/native';
import { styles } from './styles';
import { IProcessNotifier } from './interface';
import { isIos } from '../../utils/Platform';

const LOTTIE_WIDTH = 40;
const ProcessNotifier: React.FC<IProcessNotifier> = props => {
  const {
    visible = false,
    source = null,
    title = '',
    description = '',
    closeNotifier,
    status = 'doing',
  } = props;
  const animation = React.useRef(null);
  const theme: Theme = useTheme();
  const closeNotifierCB = React.useCallback(() => {
    if (closeNotifier) {
      closeNotifier();
    }
  }, [closeNotifier]);
  const scaleView = useMemo(() => {
    switch (status) {
      case 'doing': {
        return 1;
      }
      case 'done':
        return 4;
      case 'success':
        return 4;
      case 'fail':
        return 4;
      default:
        return 1;
    }
  }, [status]);
  const lottieScale = useMemo(() => {
    return {
      width: scaleView * LOTTIE_WIDTH,
      height: scaleView * LOTTIE_WIDTH,
    };
  }, [scaleView, status]);
  return (
    <Modal
      onClose={closeNotifierCB}
      visible={visible}
      opacity={0.5}
      onRequestClose={closeNotifierCB}>
      <View style={flatten([GlobalStyles.flex1, GlobalStyles.fullCenter])}>
        <View
          style={flatten([
            GlobalStyles.fullCenter,
            styles.container,
            {
              width: lottieScale?.width * 1.2 + (title || description ? 40 : 0),
              height:
                lottieScale?.height * 1.2 +
                (title ? 20 : 0) +
                (description ? 40 : 0),
            },
          ])}>
          <View
            style={StyleSheet.flatten([
              GlobalStyles.fullCenter,
              GlobalStyles.centerSelf,
              lottieScale,
            ])}>
            {source ? (
              <LottieView
                ref={animation}
                source={source}
                autoPlay
                loop
                style={[
                  lottieScale,
                  {
                    transform: [
                      { scale: status === 'fail' ? (isIos ? 1 : 1.5) : 1 },
                    ],
                  },
                ]}
              />
            ) : null}
          </View>
          {title || description ? (
            <View style={StyleSheet.flatten([styles.textsContainer])}>
              {title ? (
                <View style={StyleSheet.flatten([GlobalStyles.centerX])}>
                  <Text h4 style={StyleSheet.flatten([])}>
                    {title || ''}
                  </Text>
                </View>
              ) : null}
              {description ? (
                <View style={StyleSheet.flatten([GlobalStyles.centerX])}>
                  <Text
                    h7
                    style={StyleSheet.flatten([
                      GlobalStyles.textStyle,
                      GlobalStyles.centerText,
                    ])}>
                    {description || ''}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {/*<Button*/}
          {/*  TouchableComponent={TouchableOpacity}*/}
          {/*  onPress={closeNotifierCB}*/}
          {/*  raised={false}*/}
          {/*  type={'clear'}*/}
          {/*  // loading={true}*/}
          {/*  // loadingProps={{*/}
          {/*  //   color: Color(theme.colors.text).lighten(0.2).string(),*/}
          {/*  //   size: ScreenUtils.width * 0.045,*/}
          {/*  // }}*/}
          {/*  icon={*/}
          {/*    <Icon*/}
          {/*      type={'ionicon'}*/}
          {/*      name={'close'}*/}
          {/*      size={29}*/}
          {/*      color={'#363535'}*/}
          {/*    />*/}
          {/*  }*/}
          {/*  containerStyle={StyleSheet.flatten([*/}
          {/*    GlobalStyles.fullCenter,*/}
          {/*    styles.closeButton,*/}
          {/*  ])}*/}
          {/*/>*/}
        </View>
      </View>
    </Modal>
  );
};
export { ProcessNotifier };
