import {AvatarProps, AccessoryProps} from '../Avatar';
import {ViewProps} from 'react-native';

import colors, {Colors} from './colors';

export default {
  colors,
};

type RecursivePartial<T> = {[P in keyof T]?: RecursivePartial<T[P]>};

export interface FullTheme {
  Avatar: Partial<AvatarProps>;
  AvatarAccessory: Partial<AccessoryProps>;
  ListItemContent: Partial<ViewProps>;
  TabViewItem: Partial<ViewProps>;
  colors: RecursivePartial<Colors>;
}

export type Theme<T = {}> = Partial<FullTheme> & T;

export type UpdateTheme = (updates: RecursivePartial<FullTheme>) => void;

export type ReplaceTheme = (updates: RecursivePartial<FullTheme>) => void;
