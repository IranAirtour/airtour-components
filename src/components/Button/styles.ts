import { Platform, StyleSheet } from 'react-native';
import {FontFamily} from "../Helpers";

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    borderRadius: 3,
    height: 45,
  },
  title: {
    // fontSize: 16,
    fontFamily: FontFamily.Nunito,
    textAlign: 'center',
    paddingVertical: 1,
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  raised: {
    backgroundColor: '#fff',
    overflow: 'visible',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  loading: {
    marginVertical: 2,
  },
});
