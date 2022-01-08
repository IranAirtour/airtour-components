import { isIos } from './Platform';
import type {IServerAttachment} from "../models/IServerAttachment";

export function stringify(value: any): string {
  return typeof value === 'string' ? value : JSON.stringify(value);
}
export function jsonParse(value: string): any {
  let data = null;
  try {
    if (value) {
      data = JSON.parse(value);
    }
  } catch (_) {}
  return data;
}
export function nullify<T>(value: T, defaultValue: any = null): T | null {
  return (stringify(value) as any) ?? defaultValue;
}
export function isKindOfNullishType(value: any): boolean {
  if (
      value === null ||
      value === 'null' ||
      value === 'undefined' ||
      typeof value === 'undefined' ||
      isNaN(value)
  ) {
    return true;
  }
  return false;
}
/**
 *  extract otp code form string
 * @param str
 * @returns {String|string}
 */
export function extractNumberFromString(str: string | any): string | any {
  if (str && typeof str === 'string') {
    if (str.includes(':')) {
      return parseInt(str.split(':')[1]) + '';
    }
    return ((str.match(/\d+/g) || []).map(n => parseInt(n)) + '').slice(0, 6);
  }
  return str;
}
export function returnOnlyDigitInString(str: string | any): string | any {
  if (str && typeof str === 'string') {
    return str.replace(/\D/g, '');
  }
  return str;
}
export function extractParamsFromString(str: string | any): any {
  if (str && typeof str === 'string') {
    let _str = str;
    if (!(str.indexOf('?') > -1)) {
      _str = '/?' + str;
    }
    let regex = /[?&]([^=#]+)=([^&#]*)/g,
        params: any = {},
        match;
    while ((match = regex.exec(_str))) {
      params[match[1]] = match[2];
    }
    return params;
  }
  return {};
}
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function stringToBoolean(str: string): boolean {
  if (!str) {
    return false;
  }
  switch (str.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(str);
  }
}

/**
 *
 * @param str
 * @param prefixLength
 * @param suffixLength
 */
export function getSecuredMobile(
    str: string,
    prefixLength: number = 4,
    suffixLength: number = 2,
): string {
  const prefix = str.substring(0, prefixLength);
  const suffix = str.slice(-suffixLength);
  const stars = str.length - (prefixLength + suffixLength);
  return prefix + '*'.repeat(stars) + suffix ?? '';
}

export function isRtl(text: string): boolean {
  if (text?.length === 0) {
    return false;
  }
  const persianTemplate = /^[\u0600-\u06FF\s]+$/;
  return persianTemplate.test(text[0]);
}

/**
 * used to make TextInputs RTL or LTR in ios by given text
 * return auto in Android
 * @param text
 */
export function getInputFlexDirectionByText(text: string): 'right' | 'left' | 'auto' {
  return isIos ? (isRtl(text) ? 'right' : 'left') : 'auto';
}

export function generateAttachmentUrl(attachment: IServerAttachment, mediaUrl: string): string {
  return mediaUrl ? mediaUrl + `/${attachment?.id}?hash=${attachment?.hash}` : ''

}
