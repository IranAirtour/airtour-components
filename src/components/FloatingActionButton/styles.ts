import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    elevation: 4,
    borderRadius: 28,
  },
  largeFAB: {
    height: 56,
    width: 56,
    padding: 16,
  },
  smallFAB: {
    height: 40,
    width: 40,
    padding: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  label: {
    marginHorizontal: 8,
  },
  upperCaseLabel: {
    textTransform: 'uppercase',
  },
  extendedLabel: {
    height: 48,
    paddingHorizontal: 16,
  },
  disabled: {
    elevation: 0,
  },
});
