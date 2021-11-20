import React from 'react';
import {TextInput} from 'react-native';
import {Theme} from '@react-navigation/native';

export type SearchBarProps = React.ComponentPropsWithRef<typeof TextInput> & {
  query?: string;
  onQueryChange?: (query: string) => void;
  onQuerySubmit?: () => void;
  isLoading?: boolean;
  theme?: Theme;
};
