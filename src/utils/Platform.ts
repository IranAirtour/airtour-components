import { Platform } from 'react-native';
// @ts-ignore
import { STORE_NAME } from '@env';

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isAppStore = Platform.OS === 'ios' && STORE_NAME === 'AppStore';
