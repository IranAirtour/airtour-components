import {StatusBarProps, StyleProp, ViewStyle} from 'react-native';

export type IBaseViewProps = {
  children?: any;
  containerStyle?: StyleProp<ViewStyle>;
  statusBarStyles?: StatusBarProps;
  headerTitle?: string;
  onHeaderPress?: () => void;
  headerRight?: () => JSX.Element;
  headerLeft?: () => JSX.Element;
};
