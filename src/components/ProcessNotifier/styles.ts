import {ScreenUtils} from '../Helpers';
import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  textsContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    right: ScreenUtils.width * 0.02,
    top: ScreenUtils.width * 0.02,
    width: ScreenUtils.width * 0.15,
    height: ScreenUtils.width * 0.15,
    padding: 0,
  },
});
