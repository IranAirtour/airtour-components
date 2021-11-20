import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from '../Icon/Icon';
import {Theme, useTheme} from '@react-navigation/native';
import {styles} from './styles';
import {SearchBarProps} from './interface';
import Input from '../Input/Input';

const SearchView: FC<SearchBarProps> = props => {
  const theme: Theme = useTheme();
  const {query, onQueryChange, onQuerySubmit, isLoading, ...attributes} = props;

  return (
    <View {...attributes}>
      <View style={styles.background}>
        <TouchableOpacity
          style={{justifyContent: 'center'}}
          onPress={onQuerySubmit}
        />

        <Input
          inputStyle={styles.inputStyle}
          inputProps={{
            placeholder: 'Search Here ...',
            placeholderTextColor: 'gray',
            autoCapitalize: 'none',
            autoCorrect: false,
            value: query,
            onChangeText: onQueryChange,
            onSubmitEditing: onQuerySubmit,
          }}
          leftIcon={
            <Icon
              name={'search'}
              type={'feather'}
              containerStyle={styles.iconStyle}
            />
          }
          rightIcon={
            <ActivityIndicator
              animating={isLoading}
              size="small"
              color="#CC1150"
            />
          }
        />
      </View>
    </View>
  );
};

export default SearchView;
