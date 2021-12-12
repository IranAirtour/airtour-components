import { StyleSheet } from 'react-native';
import { ScreenUtils } from './index';
export const flatten = StyleSheet.flatten;
export const GlobalStyles = StyleSheet.create({
  displayFlex: {
    display: 'flex',
  },
  width100: {
    width: '100%',
  },
  height100: {
    height: '100%',
  },
  centerSelf: {
    alignSelf: 'center',
  },
  centerX: {
    alignItems: 'center',
  },
  centerY: {
    justifyContent: 'center',
  },
  fullCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
  justifySA: {
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: ScreenUtils.scaleFontSize(20),
    color: '#3f3f3d',
    textAlign: 'right',
  },
  leftText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  rightText: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  centerText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  noMarginXY: {
    marginVertical: 0,
    marginHorizontal: 0,
  },
  noPaddingXY: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifySpace: {
    justifyContent: 'space-between',
  },
  paddingB50: {
    paddingBottom: 50,
  },
  paddingT50: {
    paddingTop: 50,
  },
});
