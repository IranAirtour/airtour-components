import {ViewProps} from 'react-native';
import {Theme} from '@react-navigation/native';

export type IDividerProps = ViewProps & {
  style?: object | any[];
  theme: Theme;
};
