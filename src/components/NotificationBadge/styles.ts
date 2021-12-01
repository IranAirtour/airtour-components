import { StyleSheet } from 'react-native';
import {FontFamily, ScreenUtils} from "../Helpers";

const BADGE_CIRCLE_WIDTH = ScreenUtils.width * 0.05;

export const styles = StyleSheet.create({
  notificationBadgeContainer: {
    borderRadius: BADGE_CIRCLE_WIDTH / 2,
    height: BADGE_CIRCLE_WIDTH,
    width: BADGE_CIRCLE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#CB1150',
    right: 0,
  },
  notificationText: {
    color: '#FFF',
    fontFamily: FontFamily.NunitoBold,
    fontSize: 10,
    textAlign: 'center',
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
});
