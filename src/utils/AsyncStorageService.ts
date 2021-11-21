import AsyncStorage from '@react-native-community/async-storage';
import { jsonParse, stringify } from './StringUtils';
import { TokenTypes } from '../resources/strings';

export interface IKeyValueItem {
  key: string;
  value: string | number | object | boolean | null;
}

interface IAsyncStorageService {
  setItem(item: IKeyValueItem, parseString: boolean): Promise<boolean>;

  getItem(key: string, parseString: boolean): Promise<string | object>;

  mergeItem(item: IKeyValueItem): Promise<boolean>;

  removeItem(key: string): Promise<boolean>;
}

export class AsyncStorageService implements IAsyncStorageService {
  static async getItem(
    key: string,
    parseString = true,
  ): Promise<string | object> {
    try {
      const value = (await AsyncStorage.getItem(key)) as string;
      if (!value || value === 'null' || value === null) {
        return Promise.reject('no value found for ' + key);
      } else {
        // dont parse tokens
        if (Object.keys(TokenTypes).includes(key)) {
          return value;
        }
        return parseString ? jsonParse(value) : value;
      }
    } catch (e) {
      return Promise.reject('getItem failed for' + key);
      // read error
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async setItem(item: IKeyValueItem): Promise<boolean> {
    try {
      await AsyncStorage.setItem(item.key, stringify(item.value));
      return true;
    } catch (e) {
      return false;
    }
  }

  static async mergeItem(item: IKeyValueItem): Promise<boolean> {
    try {
      await AsyncStorage.mergeItem(item.key, stringify(item.value));
      return true;
    } catch (e) {
      return false;
    }
  }
}
