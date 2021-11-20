import {StyleSheet} from 'react-native';
import ScreenUtils from '../Helpers/ScreenUtils';

export const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    backgroundColor: '#F0EEEE',
    height: ScreenUtils.width * 0.12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inputStyle: {
    fontSize: 18,
    color: '#121212',
  },
  iconStyle: {
    fontSize: 24,
    alignSelf: 'center',
    marginHorizontal: 8,
  },
});
