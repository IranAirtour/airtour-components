import React, {useMemo} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal as RNModal,
  Platform,
  LayoutAnimation,
} from 'react-native';
import {IModalProps} from './interface';
import {styles} from './styles';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {GlobalStyles} from "../globalStyles";
const easeAnimation = () => {
  if (Platform.OS !== 'ios') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }
};

const ModalComponent = (props: IModalProps) => {
  const {visible, onClose, opacity = 0.4, animationType} = props;
  //https://docs.swmansion.com/react-native-gesture-handler/docs/#usage-with-modals-on-android
  if (!visible) {
    return null;
  }
  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType={animationType ? animationType : 'none'}
      onRequestClose={() => {
        if (props?.onRequestClose) {
          props.onRequestClose();
        }
        easeAnimation();
      }}>
      <View style={GlobalStyles.flex1}>
        <TouchableWithoutFeedback
          onPress={() => {
            onClose();
            easeAnimation();
          }}>
          <View
            style={StyleSheet.flatten([
              styles.overlay,
              {backgroundColor: `rgba(0,0,0,${opacity})`},
            ])}
          />
        </TouchableWithoutFeedback>
        {props.children ?? null}
      </View>
    </RNModal>
  );
};

export default ModalComponent;
