import { Platform } from 'react-native';
// @ts-ignore
import { STORE_NAME } from '@env';
import {getCountryByIp, getPublicIp} from "./IpUtils";

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isAppStore = Platform.OS === 'ios' && STORE_NAME === 'AppStore';
export const isIran = async (): Promise<boolean> => {
    const ip = await getPublicIp();
    if (ip) {
        const countryName = await getCountryByIp(ip)
        return countryName === 'Iran';
    }
    return false;
}
