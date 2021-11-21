import uuid from 'react-native-uuid';

export function randomId<T>(isString: boolean = true): T {
  return (isString
    ? uuid?.v4?.()?.toString()
    : Math.floor(Number(Math.random().toFixed(8)) * 100000000)) as unknown as T;
}
