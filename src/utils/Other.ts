import { randomId } from './RandomId';

export function keyExtractor(item: any): string {
  return item?.id || item?._id || randomId(true);
}
export function getId(item: any): string | number {
  return item?.id || item?._id || 0;
}
export function getFileExtension(url: string): string {
  return url?.split('.').pop() || '';
}

const k = 1024;
const sizes = ['Bytes', 'KB', 'MB', 'GB'];
export function formatBytes(bytes: number, decimals = 2) {
  if (!bytes) {
    return '';
  } else if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
export function getFileName(url: string): string {
  return url?.split('/')?.pop() || url;
}
export function getUrl(endpoint: string, id: number): string {
  return endpoint.replace('$id', String(id));
}

export function encodeToQueryParams(obj: Object): string {
  return (
    '?' +
    Object.entries(obj)
      .map(([key, val]) => `${key}=${val}`)
      .join('&')
  );
}

export function getQueryParamValueByName(
  url: string = '',
  name: string = '',
): string {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return '';
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function sortComparerById(a: any, b: any) {
  if (a?._id > b?._id) {
    return Number(a?._id);
  }
  return Number(b?._id);
}
export function selectById(a: any) {
  return Number(a?._id || a?.id || a?.sequentialId);
}
export function getMaxInList<T>(list: T[]): T {
  return Math.max.apply(Math, list);
}
export function getMinIdInList<T>(list: T[]): T {
  return Math.min.apply(Math, list);
}
export function copy(aObject: any) {
  if (!aObject) {
    return aObject;
  }
  let v;
  let bObject: any = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    bObject[k] = typeof v === 'object' ? copy(v) : v;
  }
  return bObject;
}
export function addValue(
  base: any,
  v: any = 5,
  returnType: string = 'string',
): any {
  const sum = Number(base) + Number(v);
  return returnType === 'string' ? String(sum) : sum;
}
export function substrValue(
  base: any,
  v: any = 5,
  returnType: string = 'string',
): any {
  const sum = Number(base) - Number(v);
  return returnType === 'string' ? String(sum) : sum;
}
export function numberWithCommas(x: any): string {
  if (typeof x === 'undefined') {
    return '';
  } else {
    // const value = Number(
    //   (typeof x !== 'string' ? String(x) : x).replace(',', ''),
    // );
    const value = typeof x !== 'string' ? String(x) : x;
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export function returnOnlyDigits(str: string | any): Number {
  if (typeof str === 'string' || typeof str === 'number') {
    return Number(String(str).replace(/\D/g, ''));
  }
  return 0;
}

export function generateShadowStyle(
  shadowColor: string = '#cdcdcd',
  other: any = {},
) {
  return {
    shadowColor,
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
    ...other,
  };
}
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
